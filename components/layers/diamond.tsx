import { colorToHex } from "@/libs/utils";
import { LayerStyle } from "@/types/layers";

interface DiamondProps {
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  onCursorDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

function Diamond({
  x,
  y,
  width,
  height,
  style,
  onCursorDown,
  selectionColor,
}: DiamondProps) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const points = [
    { x: halfWidth, y: 0 },
    { x: width, y: halfHeight },
    { x: halfWidth, y: height },
    { x: 0, y: halfHeight },
  ]
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <polygon
      className="outline-offset-2 outline outline-2 rounded"
      transform={`translate(${x}, ${y})`}
      points={points}
      onPointerDown={onCursorDown}
      style={{ outlineColor: selectionColor || "transparent" }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={style.strokeWidth}
      rx={5}
      stroke={colorToHex(style.strokeColor) || "oklch(var(--n))"}
      fill={colorToHex(style.fillColor) || "oklch(var(--nc))"}
    />
  );
}

export default Diamond;
