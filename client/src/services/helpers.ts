import { baseURL } from "./config";

export const resBodyToPostBody = (cuerpo: any) => {
  return cuerpo.map((section: any) => {
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
  });
};
