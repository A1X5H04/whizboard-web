import React from "react";

interface ImageProps {
  x: number;
  y: number;
  width: number;
  height: number;
  src?: string;
  onCursorDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

function Image({
  x,
  y,
  width,
  height,
  src,
  onCursorDown,
  selectionColor,
}: ImageProps) {
  return (
    <image
      onPointerDown={onCursorDown}
      className="outline-offset-2 outline outline-2 rounded user-select-none object-cover"
      style={{
        outlineColor: selectionColor || "transparent",
      }}
      transform={`translate(${x}, ${y})`}
      x={0}
      y={0}
      width={width}
      height={height}
      // href={src || `https://placehold.jp/${width}x${height}.png`}
      href="https://picsum.photos/200/300"
    />
  );
}

export default Image;
