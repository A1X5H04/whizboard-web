"use client";

import { memo } from "react";
import { useOther } from "@/liveblocks.config";
import { Cursor as CursonIcon } from "@phosphor-icons/react";
import { connectionIdtoColor } from "@/libs/utils";

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
      <CursonIcon
        size={24}
        weight="duotone"
        style={{
          color: connectionIdtoColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-2 py-2 badge font-semibold text-slate-800"
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
