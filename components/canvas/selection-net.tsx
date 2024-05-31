import { Point } from "@/types/canvas";
import React from "react";

interface SelectionNetProps {
  origin: Point;
  current: Point;
}

function SelectionNet({ origin, current }: SelectionNetProps) {
  return (
    <rect
      className="fill-primary/5 stroke-primary stroke-1 pointer-events-none"
      x={Math.min(origin.x, current.x)}
      y={Math.min(origin.y, current.y)}
      width={Math.abs(current.x - origin.x)}
      height={Math.abs(current.y - origin.y)}
    />
  );
}

export default SelectionNet;
