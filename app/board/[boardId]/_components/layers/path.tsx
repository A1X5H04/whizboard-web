import { getSvgPathFromStroke } from "@/libs/utils";
import getStroke from "perfect-freehand";

interface PathLayer {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onCursorDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

export function Path({ x, y, points, fill, onCursorDown, stroke }: PathLayer) {
  return (
    <path
      className="fill-base-content"
      onPointerDown={onCursorDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 5,
          thinning: 0.7,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      stroke={stroke}
      x={0}
      y={0}
    />
  );
}
