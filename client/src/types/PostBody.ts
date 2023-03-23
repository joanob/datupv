import { Image } from "./Image";

export type PostBody = (
  | TextComponent
  | ImageComponent
  | ImageWithTextComponent
  | HeaderComponent
  | TableComponent
  | ListComponent
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

export interface TableComponent {
  type: "table";
  header: string[];
  rows: string[][];
}

export interface ListComponent {
  type: "list";
  list: string[];
}

export interface InternalLink {
  texto: string;
  link: string; // absolute path. Can include domain
}

export interface ExternalLink {
  texto: string;
  url: string;
}
