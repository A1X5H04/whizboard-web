"use client";

import React, { useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import {
  connectionIdtoColor,
  resizeBounds,
  pointerEventToCanvasCoords,
  findIntersectingLayersWithSelectionRect,
  penPointsToPathLayer,
} from "@/libs/utils";

import {
  Bounds,
  Camera,
  CanvasMode,
  CanvasState,
  Point,
  Side,
} from "@/types/canvas";
import { LayerStyle, LayerType } from "@/types/layers";
import CanvasNavbar from "./navbar";
import CanvasToolbar from "./tool-bar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursor-presence";
import { LiveObject } from "@liveblocks/client";
import { Layer } from "./layer";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import SelectionNet from "./selection-net";
import { DraftLayer } from "./draft-layer";
import UndoRedoBar from "./bottom-bar";
import StyleBar from "./style-bar";
import { twMerge } from "tailwind-merge";

interface Canvas {
  boardId: string;
}

function Canvas({ boardId }: Canvas) {
  const MAX_LAYERS = 100;
  const cameraRef = React.useRef(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [image, setImage] = useState<File>();
  const [layerStyle, setLayerStyle] = useState<LayerStyle>({
    fillColor: { r: 43, g: 52, b: 64, a: 1 },
    strokeColor: { r: 215, g: 221, b: 228, a: 1 },
    strokeWidth: 3,
    edgeType: "rounded",
    strokeType: "solid",
  });

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

  // Add shape function starts here ========================================

  const addShape = useMutation(
    (
      { setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Diamond
        | LayerType.Line,
      initialPosition: Point
    ) => {
      setMyPresence({
        layerDraft: {
          layerType,
          initialPosition: {
            x: initialPosition.x,
            y: initialPosition.y,
          },
        },
      });
    },
    []
  );

  // Add shape function ends here ========================================

  // Draw shape function starts here ========================================

  const drawShape = useMutation(
    ({ self, setMyPresence }, point: Point, event: React.PointerEvent) => {
      const { layerDraft } = self.presence;
      if (layerDraft == null) return;

      // if (event.shiftKey) {
      //   const width = Math.abs(point.x - layerDraft.x);
      //   const height = Math.abs(point.y - layerDraft.y);
      //   const max = Math.max(width, height);
      //   point.x = layerDraft.x + (point.x < layerDraft.x ? -max : max);
      //   point.y = layerDraft.y + (point.y < layerDraft.y ? -max : max);
      // }

      setMyPresence({
        layerDraft: {
          ...layerDraft,
          currentPosition: {
            x: point.x,
            y: point.y,
          },
        },
      });
    },
    []
  );

  // Draw shape function ends here ========================================

  // Insert shape function starts here ========================================

  const insertShape = useMutation(
    ({ self, storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");
      const { layerDraft } = self.presence;

      if (
        layerDraft == null ||
        !layerDraft.currentPosition ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ layerDraft: null });
        return;
      }

      const layerId = nanoid();
      if (layerDraft.layerType === LayerType.Line) {
        const layer = new LiveObject({
          type: layerDraft.layerType,
          x: layerDraft.initialPosition.x,
          y: layerDraft.initialPosition.y,
          width: layerDraft.currentPosition.x - layerDraft.initialPosition.x,
          height: layerDraft.currentPosition.y - layerDraft.initialPosition.y,
          style: {
            strokeWidth: layerStyle.strokeWidth,
            strokeColor: layerStyle.strokeColor,
            strokeType: layerStyle.strokeType,
            edgeType: layerStyle.edgeType,
          },
          value: undefined,
        });
        liveLayers.set(layerId, layer);
        liveLayerIds.push(layerId);
      } else {
        const layer = new LiveObject({
          type: layerDraft.layerType,
          x: layerDraft.initialPosition.x,
          y: layerDraft.initialPosition.y,
          width: Math.abs(
            layerDraft.currentPosition.x - layerDraft.initialPosition.x
          ),
          height: Math.abs(
            layerDraft.currentPosition.y - layerDraft.initialPosition.y
          ),
          style: layerStyle,
          value: undefined,
        });
        liveLayers.set(layerId, layer);
        liveLayerIds.push(layerId);
      }

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setMyPresence({ layerDraft: null });
      setCanvasState({ mode: CanvasMode.None });
    },
    [layerStyle.fillColor]
  );

  // Insert shape function ends here ========================================

  // Insert layer function starts here ========================================

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Image | LayerType.Note | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      console.log("Image Layer: ", image);
      if (layerType === LayerType.Image) {
        const layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          width: 250,
          height: 250,
          src: image && URL.createObjectURL(image),
          style: undefined,
          value: undefined,
        });
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);
      }
      if (layerType === LayerType.Note) {
        const layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          height: 250,
          width: 250,
          style: {
            fillColor: layerStyle.fillColor,
          },
          value: "asdf",
        });
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);
      }
      if (layerType === LayerType.Text) {
        const layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          width: 150,
          height: 100,
          style: undefined,
          value: "Double click to edit me",
        });
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);
      }

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [layerStyle.fillColor]
  );

  // Insert layer function ends here ========================================

  // Resize selected layer function starts here ========================================

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
        false,
        true
      );

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  // Resize selected layer function ends here ========================================

  // Translate selected layer function starts here ========================================

  const translateSelectedLayer = useMutation(
    ({ self, storage }, points: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const liveLayers = storage.get("layers");

      const offset = {
        x: points.x - canvasState.origin.x,
        y: points.y - canvasState.origin.y,
      };

      console.info("points", points);
      console.info("offset", offset);

      for (const layerId of self.presence.selection) {
        const layer = liveLayers.get(layerId);
        if (layer) {
          console.info(
            "layer",
            layer.get("x") + offset.x,
            layer.get("y") + offset.y
          );
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, origin: points });
    },

    [canvasState]
  );

  // Translate selected layer function ends here ========================================

  // Unselect layers function starts here ========================================

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

  // Unselect layers function ends here ========================================

  // Start drawing function starts here ========================================

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: layerStyle.strokeColor,
      });
    },
    [layerStyle.strokeColor]
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

  // Start drawing function ends here ========================================

  // Insert path function starts here ========================================

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
        new LiveObject(
          penPointsToPathLayer(pencilDraft, layerStyle.strokeColor)
        )
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Drawing });
    },
    [layerStyle.strokeColor]
  );

  // Insert path function ends here ========================================

  // Update selection net function starts here ========================================

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

  // Update selection net function ends here ========================================

  // Start camera pan function starts here ========================================

  const startCameraPan = (point: Point) => {
    setCanvasState({ mode: CanvasMode.Panning, origin: point });
  };

  // Start camera pan function ends here ========================================

  // Panning camera function starts here ========================================

  const panningCamera = useCallback(
    (point: Point) => {
      if (canvasState.mode !== CanvasMode.Panning || !isDragging) return;

      setCamera((camera) => ({
        ...camera,
        x: camera.x + point.x - (canvasState.origin?.x ?? 0),
        y: camera.y + point.y - (canvasState.origin?.y ?? 0),
      }));
    },
    [canvasState, isDragging]
  );

  // Panning camera function ends here ========================================

  // onCursorUp function starts here ========================================

  const onCursorUp = useMutation(() => {
    setIsDragging(false);
    if (
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing ||
      canvasState.mode === CanvasMode.Panning
    ) {
      unselectLayers();
      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Drawing) {
      insertPath();
    } else if (canvasState.mode === CanvasMode.Creating) {
      insertShape();
    } else {
      setCanvasState({ mode: CanvasMode.None });
    }
    history.resume();
  }, [
    camera,
    canvasState,
    setCanvasState,
    history,
    insertShape,
    unselectLayers,
    insertPath,
  ]);

  // onCursorUp function ends here ========================================

  const onCursorDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const point = pointerEventToCanvasCoords(e, camera);
      setIsDragging(true);
      if (canvasState.mode === CanvasMode.Panning) {
        startCameraPan(point);
        return;
      }
      if (canvasState.mode === CanvasMode.Creating) {
        addShape(canvasState.layerType, point);
        return;
      }
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
        return;
      }
      if (canvasState.mode === CanvasMode.Drawing) {
        startDrawing(point, e.pressure);
        return;
      }
      setCanvasState({ mode: CanvasMode.Pressing, origin: point });
    },

    [camera, canvasState, setCanvasState, startDrawing, addShape, insertLayer]
  );

  const onScrollWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();

    if (event.ctrlKey) {
      setCamera((camera) => ({
        ...camera,
        zoom: Math.max(0.25, camera.zoom - event.deltaY * 0.01),
      }));
    }

    setCamera((camera) => ({
      ...camera,
      x: camera.x + event.deltaX * 0.5,
      y: camera.y + event.deltaY * 0.5,
    }));
  }, []);

  const onCursorMove = useMutation(
    ({ setMyPresence }, event: React.PointerEvent<SVGSVGElement>) => {
      event.preventDefault();

      const pointerLocation = pointerEventToCanvasCoords(event, camera);
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(pointerLocation, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Panning) {
        panningCamera(pointerLocation);
      } else if (canvasState.mode === CanvasMode.Creating) {
        drawShape(pointerLocation, event);
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
    (
      { self, setMyPresence, storage },
      e: React.PointerEvent,
      layerId: string
    ) => {
      if (
        canvasState.mode === CanvasMode.Drawing ||
        canvasState.mode === CanvasMode.Creating ||
        canvasState.mode === CanvasMode.Inserting
      )
        return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasCoords(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        origin: point,
      });
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
    <main
      className={twMerge(
        "h-full w-full touch-none relative overflow-hidden",
        canvasState.mode === CanvasMode.Panning && "cursor-grab",
        canvasState.mode === CanvasMode.Panning &&
          isDragging &&
          "cursor-grabbing",
        canvasState.mode === CanvasMode.Creating && "cursor-crosshair"
      )}
    >
      <CanvasNavbar boardId={boardId} />
      <CanvasToolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        setImage={setImage}
      />
      {canvasState.mode === CanvasMode.Creating && (
        <StyleBar layerStyle={layerStyle} setLayerStyle={setLayerStyle} />
      )}
      <SelectionTools camera={camera} lastUsedColor={layerStyle.strokeColor} />

      <svg
        onWheel={onScrollWheel}
        onPointerMove={onCursorMove}
        onPointerLeave={onCursorLeave}
        onPointerDown={onCursorDown}
        onPointerUp={onCursorUp}
        className="h-[100vh] w-[100vw]"
        style={{
          backgroundColor: "oklch(var(--b2))",
          backgroundImage:
            "linear-gradient(to right, oklch(var(--b3)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--b3)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: `${camera.x}px ${camera.y}px`,
        }}
      >
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            stroke="oklch(var(--nc))"
            fill="oklch(var(--nc))"
          />
        </marker>
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
          }}
        >
          <CursorPresence layerStyle={layerStyle} />
          <DraftLayer layerStyle={layerStyle} />

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
              <SelectionNet
                origin={canvasState.origin}
                current={canvasState.current}
              />
            )}
        </g>
      </svg>

      <UndoRedoBar
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
}

export default Canvas;
