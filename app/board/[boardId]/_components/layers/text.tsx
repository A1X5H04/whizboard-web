import { Single_Day } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { TextLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";
import { useState } from "react";

const font = Single_Day({
  weight: ["400"],
});

interface TextProps {
  id: string;
  layer: TextLayer;
  onCursorDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onCursorDown,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateText = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateText(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onCursorDown(e, id)}
    >
      <ContentEditable
        className={font.className}
        html={value || "text"}
        onChange={(e) => handleContentChange(e)}
      />
    </foreignObject>
  );
};
