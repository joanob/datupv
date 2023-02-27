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

  // FIXME: look for a way to handle copy, cut and paste of links

  const save = () => {
    if (!ref.current) {
      return;
    }
    setText(htmlToText(ref.current));
  };

  return (
    <>
      <p
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        style={{ padding: "2px", userSelect: "none" }}
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

const htmlToText = (parent: Node) => {
  let text = "";
  parent.childNodes.forEach((section) => {
    section.childNodes.forEach((children) => {
      if (!children.hasChildNodes()) {
        // Text doesn't have child nodes or siblings
        if (children.nextSibling === null) {
          text += children.textContent;
        }
      } else {
        const [textInput, urlInput, isExternalInput] = children.childNodes;
        const linkText = (textInput as HTMLInputElement).value;
        if ((isExternalInput as HTMLInputElement).checked) {
          const link: ExternalLink = {
            texto: linkText,
            url: (urlInput as HTMLInputElement).value,
          };
          text += JSON.stringify(link);
        } else {
          const link: InternalLink = {
            texto: linkText,
            link: (urlInput as HTMLInputElement).value,
          };
          text += JSON.stringify(link);
        }
      }
    });
  });
  return text;
};

export default EditableText;
