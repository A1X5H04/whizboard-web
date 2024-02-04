"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./layers/rectangle";
import { Text } from "./layers/text";
import { memo } from "react";
import Ellipse from "./layers/ellipse";
import { Path } from "./layers/path";

interface LayerProps {
  id: string;
  onLayerCursorDown: (event: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const Layer = memo(
  ({ id, onLayerCursorDown, selectionColor }: LayerProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onCursorDown={onLayerCursorDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        console.log("Path layer", layer.points);
        return (
          <Path
            key={id}
            x={layer.x}
            y={layer.y}
            fill={(layer.fill || "0", "0", "0")}
            points={layer.points}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            stroke={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onCursorDown={onLayerCursorDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onCursorDown={onLayerCursorDown}
            selectionColor={selectionColor}
          />
        );

      default:
        console.warn("Unknown layer type", layer.type);
        return null;
    }
  }
);

Layer.displayName = "Layer";
