import {
  TextComponent,
  ImageWithTextComponent,
  HeaderComponent,
} from "./BodyTypes";

export interface AdminNewsArticle {
  id: number;
  publishedAt: string; // ISO string
  fecha: string; // ISO string
  url: string;
  titulo: string;
  subtitulo: string;
  cuerpo: (TextComponent | ImageWithTextComponent | HeaderComponent)[];
}
