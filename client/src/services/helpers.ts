import { baseURL } from "./config";

export const resBodyToPostBody = (cuerpo: any) => {
  return cuerpo.map((section: any) => {
    switch (section.__component) {
      case "posts.texto":
        return { type: "text", texto: section.texto };
      case "posts.imagen":
        if (section.imagen.data.attributes) {
          const imageUrl = baseURL + section.imagen.data.attributes.url
          return {
            type: "image",
            image: { ...section.imagen.data, url: imageUrl }
          }
        } else {
          const imageUrl = baseURL + section.imagen.url;
          return {
            type: "image",
            image: { ...section.imagen, url: imageUrl },
          };
        }
      case "posts.imagen-con-texto":
        if (section.imagen.data.attributes) {
          const textImageUrl = baseURL + section.imagen.data.attributes.url;
          return {
            type: "image-with-text",
            image: { ...section.imagen.data.attributes, url: textImageUrl },
            texto: section.texto,
            alineacion: section.alineacion,
          };
        } else {
          const textImageUrl = baseURL + section.imagen.data.url;
          return {
            type: "image-with-text",
            image: { ...section.imagen.data, url: textImageUrl },
            texto: section.texto,
            alineacion: section.alineacion,
          };
        }

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
