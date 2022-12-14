import axios from "axios";
import { NavLink } from "../types/NavLink";
import { baseURL, StrapiRes } from "./config";

export const getNavLinks = async (): Promise<NavLink[]> => {
  return await axios
    .get(baseURL + "/api/nav-links?populate=%2A")
    .then((res) => {
      const navlinksRes: StrapiRes<NavLink> = res.data;
      const navlinks = navlinksRes.data.map(({ attributes }): NavLink => {
        const sublinks: NavLink["sublinks"] = [];
        if (attributes.sublinks) {
          attributes.sublinks.forEach((sublink: any) => {
            sublinks.push({
              text: sublink.text,
              url: sublink.url,
              order: sublink.order,
              samepage: sublink.samepage,
            });
          });
          sublinks.sort((a, b) => a.order - b.order);
        }
        return {
          text: attributes.text,
          url: attributes.url,
          order: attributes.order,
          sublinks: sublinks.length > 0 ? sublinks : undefined,
        };
      });
      return navlinks.sort((a, b) => a.order - b.order);
    });
};
