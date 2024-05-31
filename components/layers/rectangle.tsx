import { colorToHex } from "@/libs/utils";
import { LayerStyle } from "@/types/layers";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  onCursorDown?: (e: React.PointerEvent<SVGRectElement>) => void;
  selectionColor?: string;
}

function Rectangle({
  x,
  y,
  width,
  height,
  style,
  onCursorDown,
  selectionColor,
}: RectangleProps) {
  return (
    <rect
      className="outline-offset-2 outline outline-2 rounded"
      onPointerDown={onCursorDown}
      transform={`translate(${x}, ${y})`}
      style={{ outlineColor: selectionColor || "transparent" }}
      x={0}
      y={0}
      width={width}
      strokeDasharray="8,6"
      height={height}
      strokeWidth={style.strokeWidth}
      rx={5}
      stroke={colorToHex(style.strokeColor) || "transparent"}
      fill={colorToHex(style.fillColor) || "transparent"}
    />
  );
}

export default Rectangle;
