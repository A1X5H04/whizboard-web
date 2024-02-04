import React from "react";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onCursorDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

function Ellipse({ id, layer, onCursorDown, selectionColor }: EllipseProps) {
  return (
    <ellipse
      onPointerDown={(e) => onCursorDown(e, id)}
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
        outlineColor: selectionColor || "transparent",
        outlineOffset: "2px",
        outlineStyle: "solid",
        outlineWidth: "2px",
        borderRadius: "2px",
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={"#fff"}
      stroke={"red"}
    />
  );
}

export default Ellipse;
