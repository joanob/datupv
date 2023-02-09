import { createElement } from "react";
import { Link } from "react-router-dom";

/**
 * Internal link: {link: string, text: string}
 * External link: {url: string, text: string}
 */
export const linkParser = (text: string) => {
  // Parse text to objects
  const parts = [];

  let start = text.indexOf("{");
  let end, part;

  if (start === -1) {
    return createElement("p", {}, text);
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

  // Convert object array to jsx

  return createElement(
    "p",
    {},
    ...parts.map((part) => {
      if (part.texto !== undefined) {
        if (part.link !== undefined) {
          return createElement(Link, { to: part.link }, part.texto);
        }
        return createElement(
          "a",
          { href: part.url, target: "__blank" },
          part.texto
        );
      }
      return part;
    })
  );
};

// TODO: unspaguetti code
