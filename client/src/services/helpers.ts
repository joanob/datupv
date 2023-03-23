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
      case "posts.imagen-con-texto":
        const textImageUrl = baseURL + section.imagen.url;
        return {
          type: "image-with-text",
          image: { ...section.imagen, url: textImageUrl },
          texto: section.texto,
          alineacion: section.alineacion,
        };
      case "posts.encabezado":
        return {
          type: "header",
          tipo: section.tipo,
          texto: section.texto,
        };
      case "posts.tabla":
        return {
          type: "table",
          header: section.tabla.header,
          rows: section.tabla.content,
        };
      case "posts.lista":
        return {
          type: "list",
          list: section.elementos,
        };
      default:
        return;
    }
  });
};
