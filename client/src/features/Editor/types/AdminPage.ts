import { Body } from "./BodyTypes";

export interface AdminPage {
  id: number;
  publishedAt: string; // ISO string
  url: string;
  titulo: string;
  subtitulo: string;
  cuerpo: Body;
}
