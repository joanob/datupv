import { Image } from "./Image";

export type PostBody = (
  | TextComponent
  | ImageComponent
  | ImageWithTextComponent
)[];

export interface TextComponent {
  type: "text";
  texto: string;
}

export interface ImageComponent {
  type: "image";
  image: Image;
}

export interface ImageWithTextComponent {
  type: "image-with-text";
  image: Image;
  texto: string;
  alineacion: "texto-izquierda" | "texto-derecha";
}
