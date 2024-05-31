import React, { useState } from "react";
import Swatches from "./swatches";
import { LayerStyle } from "@/types/layers";
import { DotsThree, Minus, ListDashes } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

interface StyleBarProps {
  layerStyle: LayerStyle;
  setLayerStyle: (style: LayerStyle) => void;
}

function StyleBar({ layerStyle, setLayerStyle }: StyleBarProps) {
  return (
    <div className="absolute flex items-center justify-center px-5 right-3 h-full">
      <div className="bg-base-200 shadow-lg p-5 rounded-box w-80 space-y-5">
        <div className="space-y-3">
          <p className="text-sm">Stroke Color</p>
          <Swatches
            currentColor={layerStyle.strokeColor}
            setCurrentColor={(color) =>
              setLayerStyle({ ...layerStyle, strokeColor: color })
            }
          />
        </div>
        <div className="space-y-3">
          <p className="text-sm">Fill Color</p>
          <Swatches
            currentColor={layerStyle.fillColor}
            setCurrentColor={(color) =>
              setLayerStyle({ ...layerStyle, fillColor: color })
            }
          />
        </div>
        <div className="space-y-3">
          <p className="text-sm">Stroke Width</p>
          <input
            className="range"
            type="range"
            min={1}
            max={10}
            value={layerStyle.strokeWidth}
            onChange={(e) =>
              setLayerStyle({
                ...layerStyle,
                strokeWidth: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="space-y-3">
          <p className="text-sm">Stroke Type</p>
          <div className="flex items-center gap-x-2">
            <button
              onClick={() =>
                setLayerStyle({ ...layerStyle, strokeType: "solid" })
              }
              className={twMerge(
                "btn btn-sm",
                layerStyle.strokeType === "solid" && "btn-active"
              )}
            >
              Solid
            </button>
            <button
              onClick={() =>
                setLayerStyle({ ...layerStyle, strokeType: "dashed" })
              }
              className={twMerge(
                "btn btn-sm",
                layerStyle.strokeType === "dashed" && "btn-active"
              )}
            >
              Dashed
            </button>
            <button
              onClick={() =>
                setLayerStyle({ ...layerStyle, strokeType: "dotted" })
              }
              className={twMerge(
                "btn btn-sm",
                layerStyle.strokeType === "dotted" && "btn-active"
              )}
            >
              Dotted
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm">Edge Type</p>
          <div className="flex items-center gap-x-2">
            <button
              onClick={() =>
                setLayerStyle({ ...layerStyle, edgeType: "sharp" })
              }
              className={twMerge(
                "btn btn-sm",
                layerStyle.edgeType === "sharp" && "btn-active"
              )}
            >
              Sharp
            </button>
            <button
              onClick={() =>
                setLayerStyle({ ...layerStyle, edgeType: "sharp" })
              }
              className={twMerge(
                "btn btn-sm",
                layerStyle.edgeType === "sharp" && "btn-active"
              )}
            >
              Rounded
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StyleBar;
