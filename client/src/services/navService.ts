import axios from "axios";
import { NavLink } from "../types/NavLink";
import { baseURL, StrapiRes } from "./config";

export const getNavLinks = async (): Promise<NavLink[]> => {
  return await axios.get(baseURL + "/api/nav-links?populate=*").then((res) => {
    const navlinksRes: StrapiRes<NavLink> = res.data;
    const navlinks = navlinksRes.data.map(({ attributes }): NavLink => {
      const sublinks: NavLink["subenlaces"] = [];
      if (attributes.subenlaces) {
        attributes.subenlaces.forEach((sublink: any) => {
          sublinks.push({
            texto: sublink.texto,
            url: sublink.url,
            orden: sublink.orden,
            unapagina: sublink.unapagina,
          });
        });
        sublinks.sort((a, b) => a.orden - b.orden);
      }
      return {
        texto: attributes.texto,
        url: attributes.url,
        orden: attributes.orden,
        subenlaces: sublinks.length > 0 ? sublinks : undefined,
      };
    });
    return navlinks.sort((a, b) => a.orden - b.orden);
  });
};
