import { createElement } from "react";
import { Link } from "react-router-dom";
import { InternalLink, ExternalLink } from "../types/PostBody";
import { textToJSON } from "./textToJSON";

export const linkParser = (text: string) => {
  const parts = textToJSON(text);

  return createElement(
    "p",
    {},
    ...parts.map((part) => {
      if (typeof part === "string") {
        return part;
      }
      const internalLink = part as InternalLink;
      if (internalLink.link !== undefined) {
        const link = internalLink.link
          .replace("http://", "")
          .replace(import.meta.env.VITE_CLIENT_URL, "");
        return createElement(Link, { to: link }, internalLink.texto);
      }
      const externalLink = part as ExternalLink;
      return createElement(
        "a",
        { href: externalLink.url, target: "__blank" },
        externalLink.texto
      );
    })
  );
};
