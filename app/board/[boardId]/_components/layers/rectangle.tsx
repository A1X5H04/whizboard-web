import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onCursorDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Rectangle = ({
  id,
  layer,
  onCursorDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onCursorDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        outlineColor: selectionColor || "transparent",
        outlineOffset: "2px",
        outlineStyle: "solid",
        outlineWidth: "2px",
        borderRadius: "2px",
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={"#fff"}
    />
  );
};
