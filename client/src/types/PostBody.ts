import { Image } from "./Image";

export type PostBody = (
  | TextComponent
  | ImageComponent
  | ImageWithTextComponent
  | HeaderComponent
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

export interface HeaderComponent {
  type: "header";
  tipo: "primario" | "secundario" | "terciario";
  texto: string;
}
