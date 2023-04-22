import axios from "axios";
import { Page } from "../types";
import { baseURL, StrapiSinglePopulatedRes } from "./config";
import { resBodyToPostBody } from "./helpers";

export const getPage = async (id: string): Promise<Page> => {
  return await axios
    .get(baseURL + "/api/pages/" + id + "?populate=*")
    .then((res) => {
      const pageRes: StrapiSinglePopulatedRes<Page & { cuerpo: any }> =
        res.data;

      const body = resBodyToPostBody(pageRes.data[0].attributes.cuerpo);

      return {
        ...pageRes.data[0].attributes,
        cuerpo: body,
      };
    });
};
