import { Body } from "./BodyTypes";

export interface AdminNewsArticle {
  id: number;
  publishedAt: string; // ISO string
  fecha: string; // ISO string
  url: string;
  titulo: string;
  subtitulo: string;
  cuerpo: Body;
}
