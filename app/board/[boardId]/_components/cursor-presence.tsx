"use client";

import { memo } from "react";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./layers/path";
import { colorToCss } from "@/libs/utils";

const Cursors = () => {
  const otherConnectionIds = useOthersConnectionIds();

  return (
    <>
      {otherConnectionIds.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.pencilColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={"#000"}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      <Cursors />
      <Drafts />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
