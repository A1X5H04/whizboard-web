import { colorToHex } from "@/libs/utils";
import { Color } from "@/types/canvas";
import { Saturation, Hue, useColor, Alpha, IColor } from "react-color-palette";
import { twMerge } from "tailwind-merge";
import React from "react";
import "react-color-palette/css";

const colors: Color[] = [
  { r: 182, g: 226, b: 221, a: 1 },
  { r: 200, g: 221, b: 187, a: 1 },
  { r: 251, g: 223, b: 157, a: 1 },
  { r: 251, g: 201, b: 157, a: 1 },
  { r: 251, g: 179, b: 157, a: 1 },
];

interface SwatchesProps {
  currentColor: Color;
  setCurrentColor: (color: Color) => void;
}

function Swatches({ currentColor, setCurrentColor }: SwatchesProps) {
  const [color, setColor] = useColor(colorToHex(currentColor));

  const setColorPickerColor = (color: IColor) => {
    setColor(color);
    setCurrentColor(color.rgb as Color);
  };

  return (
    <div className="flex items-center gap-x-2">
      <div className="dropdown dropdown-left">
        {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
        <button
          tabIndex={0}
          className="btn btn-sm btn-square"
          style={{
            backgroundColor: colorToHex(currentColor),
          }}
        />
        <div
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 mx-2 space-y-2"
        >
          <div className="bg-base-200 p-4 rounded-box space-y-5">
            <div className="rounded-box overflow-hidden ">
              <Saturation
                height={150}
                color={color}
                onChange={setColorPickerColor}
              />
            </div>
            <div className="p-4 space-y-3 bg-base-100 rounded-box">
              <Alpha color={color} onChange={setColorPickerColor} />
              <Hue color={color} onChange={setColorPickerColor} />
            </div>
          </div>
        </div>
      </div>

      <span className="divider divider-horizontal -mx-1" />
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => setCurrentColor(color)}
          className={twMerge(
            "btn btn-sm btn-square p-[1px]",
            currentColor === color && "btn-primary"
          )}
        >
          <span
            className="w-full h-full rounded-btn border-2 border-base-300"
            style={{
              backgroundColor: colorToHex(color) || "oklch(var(--nc))",
            }}
          ></span>
        </button>
      ))}
    </div>
  );
}

export default Swatches;
