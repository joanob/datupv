import { Image } from "./Image";
import { PostBody } from "./PostBody";

export interface News {
  titulo: string;
  subtitulo: string;
  url: string;
  url_pagina: string;
  fecha: number;
  imagen: Image;
  cuerpo: PostBody;
}
