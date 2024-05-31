import React from "react";

interface NoteProps {
  x: number;
  y: number;
  width: number;
  height: number;
  onCursorDown?: (e: React.PointerEvent) => void;
}

function Note({ x, y, width, height, onCursorDown }: NoteProps) {
  return (
    <foreignObject
      x={0}
      y={0}
      width={width}
      height={height}
      onPointerDown={onCursorDown}
      transform={`translate(${x}, ${y})`}
    >
      <div className="w-full h-full bg-primary text-primary-content p-4 rounded-box shadow-md">
        <textarea
          className="w-full h-full resize-none outline-none bg-transparent"
          placeholder="Write something..."
        />
      </div>
    </foreignObject>
  );
}

export default Note;
