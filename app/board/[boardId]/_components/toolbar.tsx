import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import {
  ArrowUDownLeft,
  ArrowUDownRight,
  Circle,
  Cursor,
  Eraser,
  NoteBlank,
  Pencil,
  Rectangle,
  TextT,
} from "@phosphor-icons/react";

interface CanvasToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function CanvasToolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: CanvasToolbarProps) {
  return (
    <div className="absolute bottom-3 translate-x-1/2 right-1/2 ">
      <ul className="menu menu-horizontal space-x-1 bg-base-200 rounded-box mt-6">
        <li>
          <button
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
            className={
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.SelectionNet ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Select"
          >
            <Cursor size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Text,
              })
            }
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Text
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Text"
          >
            <TextT size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Note,
              })
            }
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Note
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Sticky Note"
          >
            <NoteBlank size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Ellipse,
              })
            }
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Ellipse
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Ellipse"
          >
            <Circle size={20} weight="bold" />
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle,
              })
            }
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rectangle
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Rectangle"
          >
            <Rectangle size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() => setCanvasState({ mode: CanvasMode.Drawing })}
            className={
              canvasState.mode === CanvasMode.Drawing
                ? "active tooltip"
                : "tooltip"
            }
            data-tip="Pencil"
          >
            <Pencil size={20} weight="bold" />
          </button>
        </li>
        <div className="divider divider-horizontal h-6 my-auto" />
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
            className="tooltip disabled"
            data-tip="Redo"
          >
            <ArrowUDownRight size={20} weight="bold" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CanvasToolbar;
