import { useState, useEffect, useRef } from "react";
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
  const [isReloading, setIsReloading] = useState(false);

  const save = () => {
    if (!ref.current) {
      return;
    }
    setText(htmlToText(ref.current));
  };

  const addLink = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify({ texto: "enlace", link: "" }) + " "
    );
    alert("Copiado en el portapapeles");
  };

  const reloadContent = () => {
    if (!ref.current) {
      return;
    }
    setParts(textToLinkObjects(htmlToText(ref.current)));
    setIsReloading(true);
  };

  useEffect(() => {
    if (isReloading) {
      console.log("setter");
      setIsReloading(false);
    }
  }, [isReloading]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLParagraphElement> = (
    e
  ) => {
    if (e.key === "Backspace") {
      const sel = window.getSelection();
      // Delete previous character
      // If previous character is the last character in a text component, delete child

      // TODO: make it work with links

      // FIXME: when selecting many characters it gets deleted as data.length is not 1
      if ((sel?.anchorNode as any).data.length === 1) {
        e.preventDefault();

        let index = 0;
        let element = sel?.anchorNode?.parentElement?.previousSibling;
        while (element !== null && element !== undefined) {
          index++;
          element = element.previousSibling;
        }
        ref.current?.removeChild(ref.current.children[index]);
      }
    }
    // TODO: replicate with e.key === "Delete" (delete next character)
  };

  return (
    <>
      <p
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        style={{ padding: "2px", userSelect: "none" }}
      >
        {isReloading
          ? ""
          : parts.map((part, i) => {
              if (typeof part === "string") {
                return (
                  <span onKeyDown={handleKeyDown} key={Math.random()}>
                    {part}
                  </span>
                );
              }
              return (
                <EditableLink
                  key={Math.random()}
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
      <button onClick={addLink}>Add link</button>
      <button onClick={reloadContent}>Reload</button>
    </>
  );
};

const htmlToText = (parent: Node) => {
  let text = "";
  parent.childNodes.forEach((section) => {
    if (!section.hasChildNodes()) {
      text += section.textContent;
      return;
    }
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
