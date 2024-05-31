import React from "react";
import { colorToHex } from "@/libs/utils";
import { Color } from "@/types/canvas";
import { LayerStyle } from "@/types/layers";

interface EllipseProps {
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  onCursorDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

function Ellipse({
  x,
  y,
  width,
  height,
  style,
  onCursorDown,
  selectionColor,
}: EllipseProps) {
  return (
    <ellipse
      className="outline-offset-2 outline outline-2 rounded"
      transform={`translate(${x}, ${y})`}
      onPointerDown={onCursorDown}
      style={{ outlineColor: selectionColor || "transparent" }}
      strokeWidth={3}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={colorToHex(style.fillColor) || "oklch(var(--nc))"}
      stroke={colorToHex(style.strokeColor) || "oklch(var(--n))"}
    />
  );
}

export default Ellipse;
