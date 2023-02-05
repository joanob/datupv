import axios from "axios";
import { NavLink } from "../types/NavLink";
import { baseURL, StrapiSingleRes } from "./config";

export const getNavLinks = async (): Promise<NavLink[]> => {
  return await axios.get(baseURL + "/api/nav-links?populate=*").then((res) => {
    const navlinksRes: StrapiSingleRes<
      NavLink & { pagina: { id: string } } & {
        subenlaces: { pagina: { id: string }[] };
      }
    > = res.data;
    const navlinks = navlinksRes.data.attributes.results.map(
      (navlink): NavLink => {
        const sublinks: NavLink["subenlaces"] = [];
        if (navlink.subenlaces) {
          navlink.subenlaces.forEach((sublink: any) => {
            sublinks.push({
              texto: sublink.texto,
              url: sublink.url,
              orden: sublink.orden,
              unapagina: sublink.unapagina,
              pagina: sublink.pagina ? sublink.pagina.id : null,
            });
          });
          sublinks.sort((a, b) => a.orden - b.orden);
        }
        return {
          texto: navlink.texto,
          url: navlink.url,
          orden: navlink.orden,
          subenlaces: sublinks.length > 0 ? sublinks : undefined,
          pagina: navlink.pagina ? navlink.pagina.id : null,
        };
      }
    );
    return navlinks.sort((a, b) => a.orden - b.orden);
  });
};
