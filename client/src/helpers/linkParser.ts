import { createElement } from "react";
import { Link } from "react-router-dom";

export interface InternalLink {
  texto: string;
  link: string;
}

export interface ExternalLink {
  texto: string;
  url: string;
}

export const textToLinkObjects = (text: string) => {
  if (text === null) {
    text = "";
  }

  // Parse text to objects
  const parts: (string | InternalLink | ExternalLink)[] = [];

  let start = text.indexOf("{");
  let end, part;

  if (start === -1) {
    return [text];
  }

  parts.push(text.substring(0, start));

  while (start !== -1) {
    end = text.indexOf("}", start);
    part = text.substring(start, end + 1);

    try {
      const linkObject = JSON.parse(part);

      if (linkObject.link !== undefined && linkObject.texto !== undefined) {
        const link = linkObject.link.replace(
          "http://" + import.meta.env.VITE_CLIENT_URL,
          ""
        );
        parts.push({ link, texto: linkObject.texto });
      } else if (
        linkObject.url !== undefined &&
        linkObject.texto !== undefined
      ) {
        parts.push(linkObject);
      } else {
        parts.push(JSON.stringify(linkObject));
      }
    } catch (err) {
      parts.push(part);
    }

    start = text.indexOf("{", end);
    if (start === -1) {
      parts.push(text.substring(end + 1, text.length));
      break;
    }
    if (start !== end) {
      parts.push(text.substring(end + 1, start));
    }
  }

  if (end === undefined) {
    parts.push(text);
  }

  return parts.filter((part) =>
    typeof part === "string" ? part !== "" : true
  );
};

export const linkParser = (text: string) => {
  const parts = textToLinkObjects(text);

  return createElement(
    "p",
    {},
    ...parts.map((part) => {
      if (typeof part === "string") {
        return part;
      }
      const internalLink = part as InternalLink;
      if (internalLink.link !== undefined) {
        return createElement(
          Link,
          { to: internalLink.link },
          internalLink.texto
        );
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
