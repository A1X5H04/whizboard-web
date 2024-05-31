import { CanvasMode, CanvasState } from "@/types/canvas";
import { LayerType } from "@/types/layers";
import {
  Circle,
  Cursor,
  Pencil,
  Rectangle,
  TextT,
  Diamond,
  Hand,
  Image,
  NoteBlank,
  Minus,
} from "@phosphor-icons/react";
import { useRef } from "react";
import toast from "react-hot-toast";
interface CanvasToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  setImage: (image: File) => void;
}

function CanvasToolbar({
  canvasState,
  setCanvasState,
  setImage,
}: CanvasToolbarProps) {
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute flex items-center justify-center px-5 left-3 h-full z-20">
      <ul className="menu menu-vertical space-y-2 bg-base-300 rounded-box">
        <li>
          <button
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
            className={
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.SelectionNet ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Select"
          >
            <Cursor size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() => setCanvasState({ mode: CanvasMode.Panning })}
            className={
              canvasState.mode === CanvasMode.Panning
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Hand (Panning Tool)"
          >
            <Hand size={20} weight="bold" />
          </button>
        </li>
        <span className="divider divider-vertical px-2" />

        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Creating,
                layerType: LayerType.Rectangle,
              })
            }
            className={
              canvasState.mode === CanvasMode.Creating &&
              canvasState.layerType === LayerType.Rectangle
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Rectangle"
          >
            <Rectangle size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Creating,
                layerType: LayerType.Ellipse,
              })
            }
            className={
              canvasState.mode === CanvasMode.Creating &&
              canvasState.layerType === LayerType.Ellipse
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
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
                mode: CanvasMode.Creating,
                layerType: LayerType.Line,
              })
            }
            className={
              canvasState.mode === CanvasMode.Creating &&
              canvasState.layerType === LayerType.Line
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Line"
          >
            <Minus size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Creating,
                layerType: LayerType.Diamond,
              })
            }
            className={
              canvasState.mode === CanvasMode.Creating &&
              canvasState.layerType === LayerType.Diamond
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Diamond"
          >
            <Diamond size={20} weight="bold" />
          </button>
        </li>
        <li>
          <button
            onClick={() => setCanvasState({ mode: CanvasMode.Drawing })}
            className={
              canvasState.mode === CanvasMode.Drawing
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Pencil"
          >
            <Pencil size={20} weight="bold" />
          </button>
        </li>
        <span className="divider divider-vertical px-2" />
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
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
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
                layerType: LayerType.Text,
              })
            }
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Text
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Text"
          >
            <TextT size={20} weight="bold" />
          </button>
        </li>
        <li>
          <input
            type="file"
            style={{ display: "none" }}
            ref={imageRef}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileType = file.type;
                if (fileType.startsWith("image/")) {
                  setImage(file);
                  setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Image,
                  });
                } else {
                  toast.error("Invalid file type. Please select an image.");
                  setCanvasState({ mode: CanvasMode.None });
                }
              }
            }}
          />
          <button
            onClick={() => {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }}
            className={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Image
                ? "active tooltip tooltip-right"
                : "tooltip tooltip-right"
            }
            data-tip="Place Image"
          >
            <Image alt="Image" size={20} weight="bold" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CanvasToolbar;
