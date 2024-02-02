"use client";

import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import CanvasNavbar from "./navbar";
import CanvasToolbar from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursor-presence";
import { LiveObject } from "@liveblocks/client";

import { Layer } from "./layer";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
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

  const layerIds = useStorage((root) => root.layerIds);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

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

  const onCursorUp = useMutation(
    ({}, event: React.PointerEvent) => {
      const point = pointerEventToCanvasCoords(event, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const pointerEventToCanvasCoords = (
    event: React.PointerEvent,
    camera: Camera
  ) => {
    return {
      x: Math.round(event.clientX + camera.x),
      y: Math.round(event.clientY + camera.y),
    };
  };

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

      setMyPresence({ cursor: pointerLocation });
    },
    []
  );

  const onCursorLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="w-screen h-screen touch-none relative">
      <CanvasNavbar boardId={boardId} />
      <svg
        onWheel={onScrollWheel}
        onPointerMove={onCursorMove}
        onPointerLeave={onCursorLeave}
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
              onLayerCursorDown={() => {}}
              selectionColor="#000"
            />
          ))}
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
