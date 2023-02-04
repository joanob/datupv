import axios from "axios";
import { Image } from "../types";
import { News } from "../types/News";
import { baseURL, StrapiImgResponse, StrapiRes } from "./config";

export const getNewsfeed = async (): Promise<News[]> => {
  return await axios.get(baseURL + "/api/newsfeed?populate=*").then((res) => {
    const newsfeedRes: StrapiRes<
      News & { imagen: StrapiImgResponse } & { cuerpo: any }
    > = res.data;
    const newsfeed = newsfeedRes.data.map(({ attributes }): News => {
      // Get image
      const image: Image = {
        url: baseURL + attributes.imagen.data.attributes.url,
        altText: attributes.imagen.data.attributes.alternativeText,
        caption: attributes.imagen.data.attributes.caption,
        width: attributes.imagen.data.attributes.width,
        height: attributes.imagen.data.attributes.height,
      };

      // Get body
      const body = attributes.cuerpo.map((component: any) => {
        switch (component.__component) {
          case "posts.texto":
            return { type: "text", texto: component.texto };
          case "posts.imagen":
            return {
              type: "image",
            };
          default:
            return;
        }
      });

      return {
        titulo: attributes.titulo,
        subtitulo: attributes.subtitulo,
        url: attributes.url,
        // Datetime comes as an ISO string
        fecha: new Date(attributes.fecha).getTime(),
        imagen: image,
        cuerpo: body,
      };
    });
    return newsfeed.sort((a, b) => b.fecha - a.fecha);
  });
};
