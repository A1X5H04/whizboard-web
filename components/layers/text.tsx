import { Single_Day } from "next/font/google";

import { useMutation } from "@/liveblocks.config";
import { Text as VisxText } from "@visx/text";
import { useEffect, useRef, useState } from "react";

const font = Single_Day({
  weight: ["400"],
});

interface TextProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  textValue: string;
  onCursorDown: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

function Text({
  id,
  x,
  y,
  width,
  height,
  textValue,
  onCursorDown,
  selectionColor,
}: TextProps) {
  const [value, setValue] = useState(textValue);
  // const [dimensions, setDimensions] = useState({ width, height });
  const [editText, setEditText] = useState(true);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const updateText = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  // const resizeText = useMutation(({ storage, self }) => {}, []);

  if (editText) {
    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className="w-full">
          <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              updateText(e.target.value);
            }}
            style={{
              width: width,
              height: height,
            }}
            autoFocus
            className="focus:outline-none w-full bg-transparent text-white resize-none"
            onBlur={() => setEditText(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setEditText(false);
              }
            }}
          />
        </div>
      </foreignObject>
    );
  }
  return (
    <VisxText
      x={0}
      y={0}
      verticalAnchor="start"
      width={width}
      height={height}
      transform={`translate(${x} ${y})`}
      lineHeight={"1.5em"}
      dy={".35em"}
      fill="#fff"
      onDoubleClick={() => setEditText(true)}
      onPointerDown={onCursorDown}
    >
      {value}
    </VisxText>
  );
}

export default Text;
