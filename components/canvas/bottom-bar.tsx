import { ArrowUDownLeft, ArrowUDownRight } from "@phosphor-icons/react";
import React from "react";

interface BottomBarProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function BottomBar({ undo, redo, canUndo, canRedo }: BottomBarProps) {
  return (
    <div className="absolute flex items-center justify-center px-5 bottom-3 w-full">
      <ul className="menu menu-horizontal space-x-2 bg-base-300 rounded-box">
        <li className={!canUndo ? "disabled" : ""}>
          <button
            onClick={undo}
            disabled={!canUndo}
            className="tooltip"
            data-tip="Undo"
          >
            <ArrowUDownLeft size={20} weight="bold" />
          </button>
        </li>
        <li className={!canRedo ? "disabled" : ""}>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="tooltip"
            data-tip="Redo"
          >
            <ArrowUDownRight size={20} weight="bold" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BottomBar;
