import React, { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import {
  SelectionBackground,
  SelectionForeground,
  Trash,
  TrashSimple,
} from "@phosphor-icons/react";

interface SelectionToolbarProps {
  camera: Camera;
  lastUsedColor: Color;
}
export const SelectionTools = memo(
  ({ camera, lastUsedColor }: SelectionToolbarProps) => {
    const selection = useSelf((self) => self.presence.selection);
    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];

        const layerArr = liveLayersIds.toImmutable();

        for (let i = 0; i < layerArr.length; i++) {
          if (selection.includes(layerArr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayersIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];

        const layerArr = liveLayersIds.toImmutable();

        for (let i = 0; i < layerArr.length; i++) {
          if (selection.includes(layerArr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayersIds.move(
            indices[i],
            liveLayersIds.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        selection.forEach((layerId) => {
          liveLayers.get(layerId)?.set("fill", fill);
        });
      },
      [selection, lastUsedColor]
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute"
        style={{
          transform: `translate(calc(${x}px - 50%) , calc(${y - 16}px - 100%))`,
        }}
      >
        <ul className="menu menu-xs menu-horizontal bg-base-200 rounded-box">
          <li>
            <button
              onClick={moveToBack}
              className="tooltip"
              data-tip="Move to Back"
            >
              <SelectionForeground size={20} />
            </button>
          </li>
          <li>
            <button
              onClick={moveToFront}
              className="tooltip"
              data-tip="Move to Front"
            >
              <SelectionBackground size={20} />
            </button>
          </li>
          <li>
            <button
              onClick={deleteLayers}
              className="tooltip"
              data-tip="Delete"
            >
              <TrashSimple color="red" size={20} />
            </button>
          </li>
        </ul>
        {/* <button onClick={deleteLayers}>Delete Layer</button>
        <button onClick={moveToBack}>Send to Back</button>
        <button onClick={moveToFront}>Bring to Front</button> */}
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
