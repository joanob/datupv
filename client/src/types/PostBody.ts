import { Image } from "./Image";

export type PostBody = (TextComponent | ImageComponent)[];

export interface TextComponent {
  type: "text";
  texto: string;
}

export interface ImageComponent {
  type: "image";
  image: Image;
}
