"use client";

import React, { useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import {
  connectionIdtoColor,
  resizeBounds,
  pointerEventToCanvasCoords,
  findIntersectingLayersWithSelectionRect,
  penPointsToPathLayer,
  colorToCss,
} from "@/libs/utils";

import {
  Bounds,
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
} from "@/types/canvas";
import CanvasNavbar from "./navbar";
import CanvasToolbar from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursor-presence";
import { LiveObject } from "@liveblocks/client";
import { Layer } from "./layer";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { Path } from "./layers/path";

interface Canvas {
  boardId: string;
}

function Canvas({ boardId }: Canvas) {
  const MAX_LAYERS = 100;
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const pencilDraft = useSelf((self) => self.presence.pencilDraft);
  const layerIds = useStorage((root) => root.layerIds);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdtoColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const translateSelectedLayer = useMutation(
    ({ self, storage }, points: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: points.x - canvasState.current.x,
        y: points.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");
      for (const layerId of self.presence.selection) {
        const layer = liveLayers.get(layerId);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: points });
    },

    [canvasState]
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const startMultiSelection = useCallback(
    (pointerPosition: Point, origin: Point) => {
      if (
        Math.abs(pointerPosition.x - origin.x) +
          Math.abs(pointerPosition.y - origin.y) >
        5
      )
        setCanvasState({
          mode: CanvasMode.SelectionNet,
          origin,
          current: pointerPosition,
        });
    },
    []
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Drawing ||
        e.buttons !== 1 ||
        pencilDraft == null
      )
        return;
      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;
      console.log(pencilDraft?.length);
      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Drawing });
    },
    [lastUsedColor]
  );

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, pointerPosition: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current: pointerPosition,
      });

      const ids = findIntersectingLayersWithSelectionRect(
        layerIds,
        layers,
        origin,
        pointerPosition
      );

      setMyPresence({ selection: ids });
    },

    [layerIds]
  );

  const onCursorUp = useMutation(
    ({}, event: React.PointerEvent) => {
      const point = pointerEventToCanvasCoords(event, camera);
      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Drawing) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      history.resume();
    },
    [
      camera,
      canvasState,
      setCanvasState,
      history,
      insertLayer,
      unselectLayers,
      insertPath,
    ]
  );

  const onCursorDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasCoords(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) return;
      if (canvasState.mode === CanvasMode.Drawing) {
        startDrawing(point, e.pressure);
        return;
      }
      setCanvasState({ mode: CanvasMode.Pressing, origin: point });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onScrollWheel = useCallback((event: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - event.deltaX,
      y: camera.y - event.deltaY,
    }));
  }, []);

  const onCursorMove = useMutation(
    ({ setMyPresence }, event: React.PointerEvent) => {
      event.preventDefault();
      const pointerLocation = pointerEventToCanvasCoords(event, camera);
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(pointerLocation, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(pointerLocation, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(pointerLocation);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(pointerLocation);
      } else if (canvasState.mode === CanvasMode.Drawing) {
        continueDrawing(pointerLocation, event);
      }
      setMyPresence({ cursor: pointerLocation });
    },
    [
      camera,
      canvasState,
      resizeSelectedLayer,
      translateSelectedLayer,
      startMultiSelection,
      updateSelectionNet,
      continueDrawing,
    ]
  );

  const onCursorLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onLayerCursorDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Drawing ||
        canvasState.mode === CanvasMode.Inserting
      )
        return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasCoords(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, canvasState.mode, history]
  );

  const onResizeHandleCursorDown = useCallback(
    (corner: Side, initialBounds: Bounds) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.Resizing, corner, initialBounds });
    },
    [history]
  );

  return (
    <main className="h-full w-full touch-none relative">
      <CanvasNavbar boardId={boardId} />
      <SelectionTools camera={camera} lastUsedColor={lastUsedColor} />
      <svg
        onWheel={onScrollWheel}
        onPointerMove={onCursorMove}
        onPointerLeave={onCursorLeave}
        onPointerDown={onCursorDown}
        onPointerUp={onCursorUp}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorPresence />
          {layerIds.map((layerId) => (
            <Layer
              key={layerId}
              id={layerId}
              onLayerCursorDown={onLayerCursorDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandleCursorDown={onResizeHandleCursorDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1 pointer-events-none"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.current.x - canvasState.origin.x)}
                height={Math.abs(canvasState.current.y - canvasState.origin.y)}
              />
            )}
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>

      <CanvasToolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
}

export default Canvas;
