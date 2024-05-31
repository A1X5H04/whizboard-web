import { LayerType } from "./layers";

export enum CanvasMode {
  None,
  Pressing,
  Panning,
  Inserting,
  Creating,
  SelectionNet,
  Translating,
  Resizing,
  Drawing,
}

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Right = 8,
  Bottom = 2,
  Left = 4,
}

export type CanvasState =
  | { mode: CanvasMode.None }
  | { mode: CanvasMode.Pressing; origin: Point }
  | { mode: CanvasMode.Panning; origin?: Point }
  | {
      mode: CanvasMode.Translating;
      origin: Point;
    }
  | { mode: CanvasMode.SelectionNet; origin: Point; current?: Point }
  | {
      mode: CanvasMode.Creating;
      layerType:
        | LayerType.Rectangle
        | LayerType.Ellipse
        | LayerType.Diamond
        | LayerType.Line;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType: LayerType.Text | LayerType.Note | LayerType.Image;
    }
  | { mode: CanvasMode.Resizing; initialBounds: Bounds; corner: Side }
  | { mode: CanvasMode.Drawing };
