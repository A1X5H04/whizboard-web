import React from "react";

interface LineProps {
  x: number;
  y: number;
  x2: number;
  y2: number;
  onCursorDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

function Line({ x, y, x2, y2, onCursorDown, selectionColor }: LineProps) {
  return (
    <line
      className="outline outline-2 rounded"
      onPointerDown={onCursorDown}
      x1={0}
      y1={0}
      x2={x2}
      y2={y2}
      style={{ outlineColor: selectionColor || "transparent" }}
      transform={`translate(${x} ${y})`}
      markerEnd="url(#arrow)"
      strokeLinecap="round"
      stroke="oklch(var(--nc))"
      fill={selectionColor || "transparent"}
      strokeWidth={4}
    />
  );
}

export default Line;
