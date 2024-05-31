"use client";

import { memo } from "react";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "../layers";
import { colorToHex } from "@/libs/utils";
import { DraftLayer } from "./draft-layer";
import { LayerStyle } from "@/types/layers";

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

const Drafts = ({ layerStyle }: { layerStyle: LayerStyle }) => {
  const others = useOthersMapped(
    (other) => ({
      layerDraft: other.presence.layerDraft,
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
              fill={other?.penColor || { r: 0, g: 0, b: 0, a: 1 }}
            />
          );
        }
        if (other.layerDraft) {
          return <DraftLayer key={key} layerStyle={layerStyle} />;
        }
        return null;
      })}
    </>
  );
};

export const CursorPresence = memo(
  ({ layerStyle }: { layerStyle: LayerStyle }) => {
    return (
      <>
        <Cursors />
        <Drafts layerStyle={layerStyle} />
      </>
    );
  }
);

CursorPresence.displayName = "CursorPresence";
