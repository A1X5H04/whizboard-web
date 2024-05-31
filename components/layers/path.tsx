import { getSvgPathFromStroke } from "@/libs/utils";
import { Color } from "@/types/canvas";
import getStroke from "perfect-freehand";

interface PathLayer {
  x: number;
  y: number;
  points: number[][];
  fill: Color;
  onCursorDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

function Path({ x, y, points, fill, onCursorDown, stroke }: PathLayer) {
  return (
    <path
      className="fill-base-content"
      onPointerDown={onCursorDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 10,
          thinning: 0.7,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      transform={`translate(${x}, ${y})`}
      stroke={stroke}
      x={0}
      y={0}
    />
  );
}

export default Path;
