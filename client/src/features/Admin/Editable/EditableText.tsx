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

  // FIXME: look for a better way for handling copy, cut and paste

  const handleForbiddenAction = (e: any) => {
    e.preventDefault();
    alert("No se puede copiar, cortar ni pegar");
  };

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
            return (
              <span
                key={i}
                onCopy={handleForbiddenAction}
                onCut={handleForbiddenAction}
                onPaste={handleForbiddenAction}
              >
                {part}
              </span>
            );
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
  parent.childNodes.forEach((child) => {
    // Text childrens have one child
    if (child.childNodes.length <= 1) {
      text += child.textContent;
      return;
    }
    const [textInput, urlInput, isExternalInput] =
      child.childNodes[1].childNodes;
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
  });
  return text;
};

export default EditableText;
