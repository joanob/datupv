import axios from "axios";
import { Image } from "../types";
import { News } from "../types/News";
import {
  baseURL,
  StrapiImgResponse,
  StrapiRes,
  StrapiSingleRes,
} from "./config";

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

      return {
        titulo: attributes.titulo,
        subtitulo: attributes.subtitulo,
        url: attributes.url,
        // Datetime comes as an ISO string
        fecha: new Date(attributes.fecha).getTime(),
        imagen: image,
        cuerpo: [],
      };
    });
    return newsfeed.sort((a, b) => b.fecha - a.fecha);
  });
};

export const getNews = async (id: string): Promise<News | null> => {
  return await axios
    .get(baseURL + "/api/newsfeed/" + id + "?populate=*")
    .then((res) => {
      const newsRes: StrapiSingleRes<
        News & { imagen: StrapiImgResponse } & { cuerpo: any }
      > = res.data;

      const body = newsRes.data.attributes.results[0].cuerpo.map(
        (section: any) => {
          switch (section.__component) {
            case "posts.texto":
              return { type: "text", texto: section.texto };
            case "posts.imagen":
              const imageUrl = baseURL + section.imagen.url;
              return {
                type: "image",
                image: { ...section.imagen, url: imageUrl },
              };
          }
        }
      );

      const news: News = {
        ...newsRes.data.attributes.results[0],
        cuerpo: body,
      };

      return news;
    })
    .catch(() => {
      return null;
    });
};
