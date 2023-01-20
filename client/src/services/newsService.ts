import axios from "axios";
import { News } from "../types/News";
import { baseURL, StrapiImgResponse, StrapiRes } from "./config";

export const getNewsfeed = async (): Promise<News[]> => {
  return await axios.get(baseURL + "/api/newsfeed?populate=%2A").then((res) => {
    const newsfeedRes: StrapiRes<News & { image: StrapiImgResponse }> =
      res.data;
    const newsfeed = newsfeedRes.data.map(({ attributes }): News => {
      const image: News["image"] = {
        url: baseURL + attributes.image.data.attributes.url,
        altText: attributes.image.data.attributes.alternativeText,
        caption: attributes.image.data.attributes.caption,
        width: attributes.image.data.attributes.width,
        height: attributes.image.data.attributes.height,
      };

      return {
        title: attributes.title,
        subtitle: attributes.subtitle,
        url: attributes.url,
        // Datetime comes as an ISO string
        datetime: new Date(attributes.datetime).getTime(),
        image: image,
      };
    });
    return newsfeed.sort((a, b) => b.datetime - a.datetime);
  });
};
