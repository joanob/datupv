import { useState, useRef } from "react";
import {
  ExternalLink,
  InternalLink,
  textToLinkObjects,
} from "../../../helpers/linkParser";
import EditableLink from "./EditableLink";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const EditableText = ({ text, setText }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [parts, setParts] = useState(textToLinkObjects(text));

  const save = () => {
    if (!ref.current) {
      return;
    }
    const html = ref.current.innerHTML.replaceAll("&nbsp;", " ");
    const newText = htmlWithSpanToText(html, parts);
    console.log({ newText });
  };

  // Space after link outside span is nbsp. I should replace nbsp in function replacing only first by

  // FIXME: link is treated as a character and will get deleted with one keydown

  return (
    <>
      <p
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        style={{ padding: "2px" }}
      >
        {parts.map((part, i) => {
          if (typeof part === "string") {
            return <span key={i}>{part}</span>;
          }
          return (
            <EditableLink
              key={i}
              link={part}
              setLink={(link) => {
                const newParts = parts;
                newParts[i] = link;
                setParts(newParts);
              }}
            />
          );
        })}
      </p>
      <button onClick={save} style={{ marginBottom: "20px" }}>
        Save
      </button>
    </>
  );
};

// Links are wrapped by a contenteditable span
// Unactive links start with <span contenteditable="false">
// Active links start with <span contenteditable="false"><span>
const activeLinkStartHTML = '<span contenteditable="false"><span>';
const activeLinkEndHTML = "</span></span>";
const unactiveLinkStartHTML = '<span contenteditable="false">';
const unactiveLinkEndHTML = "</span>";

const htmlWithSpanToText = (
  html: string,
  parts: (string | InternalLink | ExternalLink)[]
) => {
  const linkParts = parts.filter((part) => typeof part !== "string");
  let text = "";

  // FIXME: sanitize html to avoid problems. I don't know how I would do it but I dont want a span text or a > ruin the algorithm

  let htmlIndex = 0;
  let linkIndex = 0;

  while (true) {
    let lowerIndex = -1;

    // Both links html start the same but active has an additional span
    const unactiveLinkStart = html.indexOf(unactiveLinkStartHTML, htmlIndex);
    if (unactiveLinkStart !== -1) {
      // There is a link, active or unactive
      const activeLinkStart = html.indexOf(activeLinkStartHTML, htmlIndex);
      if (activeLinkStart !== -1 && activeLinkStart === unactiveLinkStart) {
        // link is active
        lowerIndex = activeLinkStart;
      } else {
        // link is unactive
        lowerIndex = unactiveLinkStart;
      }
    }

    if (lowerIndex === -1) {
      // not more links found, only text remaining
      text += html
        .slice(htmlIndex)
        .replaceAll("<span>", "")
        .replaceAll("</span>", "");
      break;
    }

    const textBeforeLink = html.slice(htmlIndex, lowerIndex);

    text += textBeforeLink.replaceAll("<span>", "").replaceAll("</span>", "");
    htmlIndex = html.indexOf("</span>", htmlIndex) + "</span>".length;
    text += JSON.stringify(linkParts[linkIndex]);
    linkIndex++;

    if (unactiveLinkStart === lowerIndex) {
      // Unactive link is <span contenteditable="false">{text}</span>
      htmlIndex =
        html.indexOf(unactiveLinkEndHTML, htmlIndex) +
        unactiveLinkEndHTML.length;
    } else {
      // Active link is <span><span>input+input+input</span></span>
      htmlIndex =
        html.indexOf(activeLinkEndHTML, htmlIndex) + activeLinkEndHTML.length;
      console.log(html.slice(htmlIndex));
    }
  }

  return text;
};

export default EditableText;
