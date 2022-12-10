import axios from "axios";
import { NavLink } from "../types/NavLink";
import { baseURL } from "./config";

interface NavLinksRes {
  data: {
    attributes: {
      text: string;
      url: string;
      order: number;
      sublinks?: {
        text: string;
        url: string;
        order: number;
        samepage: boolean;
      }[];
    };
  }[];
}

export const getNavLinks = async (): Promise<NavLink[]> => {
  return await axios
    .get(baseURL + "/api/nav-links?populate=%2A")
    .then((res) => {
      const navlinksRes: NavLinksRes = res.data;
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
