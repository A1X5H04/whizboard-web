import { Color } from "./canvas";

export enum LayerType {
  Rectangle,
  Ellipse,
  Line,
  Path,
  Diamond,
  Image,
  Text,
  Note,
}

export type LayerStyle = {
  strokeWidth: number;
  strokeColor: Color;
  fillColor: Color;
  strokeType: "solid" | "dashed" | "dotted";
  edgeType: "rounded" | "sharp";
};

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  value?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  value?: string;
};

export type ImageLayer = {
  type: LayerType.Image;
  x: number;
  y: number;
  width: number;
  height: number;
  src?: string;
  style?: LayerStyle;
  value?: string;
};

export type LineLayer = {
  type: LayerType.Line;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    strokeWidth: number;
    strokeColor: Color;
    strokeType: "solid" | "dashed" | "dotted";
    edgeType: "rounded" | "sharp";
  };
  value?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    fillColor: Color;
  };
  points: number[][];
  value?: string;
};

export type DiamondLayer = {
  type: LayerType.Diamond;
  x: number;
  y: number;
  width: number;
  height: number;
  style: LayerStyle;
  value?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
  style?: {
    fillColor: Color;
  };
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    fillColor: Color;
  };
  value?: string;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | DiamondLayer
  | LineLayer
  | PathLayer
  | ImageLayer
  | TextLayer
  | NoteLayer;
