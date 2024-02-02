"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";

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
        return <div>Rectangle</div>;
      case LayerType.Ellipse:
        return <div>Ellipse</div>;
      default:
        console.warn("Unknown layer type", layer.type);
        return null;
    }

    return <div>Layer</div>;
  }
);

Layer.displayName = "Layer";
