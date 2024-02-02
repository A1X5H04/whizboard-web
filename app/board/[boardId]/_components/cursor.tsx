"use client";

import { memo } from "react";
import { useOther } from "@/liveblocks.config";

const displayColors = [
  "#ef476f",
  "#f78c6b",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#073b4c",
];

const connectionIdtoColor = (connectionId: number) => {
  return displayColors[connectionId % displayColors.length];
};

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);
  const name = info?.name || "Teammate";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      className="relative"
      height={50}
      width={name.length * 10 * 24}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <div
        className="w-5 h-5"
        style={{
          backgroundColor: connectionIdtoColor(connectionId),
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute left-5 px-2 py-2 rounded-md text-xs text-white font-semibold"
        style={{
          backgroundColor: connectionIdtoColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
