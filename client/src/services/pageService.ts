import axios from "axios";
import { Page } from "../types";
import { baseURL, StrapiSingleRes } from "./config";
import { resBodyToPostBody } from "./helpers";

export const getPage = async (id: string): Promise<Page> => {
  return await axios
    .get(baseURL + "/api/pages/" + id + "?populate=*")
    .then((res) => {
      const pageRes: StrapiSingleRes<Page> = res.data;

      const cuerpo = resBodyToPostBody(pageRes.data.attributes.cuerpo);

      return {
        titulo: pageRes.data.attributes.titulo,
        cuerpo,
      };
    });
};
