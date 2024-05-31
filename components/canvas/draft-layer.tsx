import React, { memo } from "react";

import { useSelf } from "@/liveblocks.config";
import { LayerStyle, LayerType } from "@/types/layers";
import { Rectangle, Ellipse, Line, Path, Diamond } from "../layers";

interface DraftLayerProps {
  layerStyle: LayerStyle;
}

export const DraftLayer = memo(({ layerStyle }: DraftLayerProps) => {
  const { layerDraft, pencilDraft } = useSelf((self) => self.presence);

  if (pencilDraft != null && pencilDraft.length > 0) {
    return (
      <Path points={pencilDraft} fill={layerStyle.fillColor} x={0} y={0} />
    );
  }

  if (!layerDraft || !layerDraft?.currentPosition) return null;
  const width = layerDraft.currentPosition.x - layerDraft.initialPosition.x;
  const height = layerDraft.currentPosition.y - layerDraft.initialPosition.y;

  switch (layerDraft?.layerType) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          x={layerDraft.initialPosition.x}
          y={layerDraft.initialPosition.y}
          width={width}
          height={height}
          style={layerStyle}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          x={layerDraft.initialPosition.x}
          y={layerDraft.initialPosition.y}
          width={width}
          height={height}
          style={layerStyle}
        />
      );
    case LayerType.Diamond:
      return (
        <Diamond
          x={layerDraft.initialPosition.x}
          y={layerDraft.initialPosition.y}
          width={width}
          height={height}
          style={layerStyle}
        />
      );
    case LayerType.Line:
      return (
        <Line
          x={layerDraft.initialPosition.x}
          y={layerDraft.initialPosition.y}
          x2={width}
          y2={height}
        />
      );
    default:
      console.warn("Unknown shape draft type", layerDraft);
      return null;
  }
});

DraftLayer.displayName = "DraftLayer";
