"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/layers";
import { memo } from "react";
import {
  Rectangle,
  Diamond,
  Ellipse,
  Image,
  Line,
  Note,
  Path,
  Text,
} from "../layers";

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
            key={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            style={layer.style}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={id}
            x={layer.x}
            y={layer.y}
            fill={layer.style.fillColor}
            points={layer.points}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            stroke={selectionColor}
          />
        );

      case LayerType.Ellipse:
        return (
          <Ellipse
            key={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            style={layer.style}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Diamond:
        return (
          <Diamond
            key={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            style={layer.style}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Line:
        return (
          <Line
            key={id}
            x={layer.x}
            y={layer.y}
            x2={layer.width}
            y2={layer.height}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Note:
        console.log("Note layer");
        return (
          <Note
            key={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            // selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            textValue={layer.value || "New Text"}
            onCursorDown={(e) => onLayerCursorDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Image:
        console.log("Image layer", layer.src);
        return (
          <Image
            key={id}
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            onCursorDown={(e) => {
              e.preventDefault();
              onLayerCursorDown(e, id);
            }}
            src={layer.src}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

Layer.displayName = "Layer";
