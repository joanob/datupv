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
    setParts(textToLinkObjects(htmlToText(ref.current)));
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
      setIsReloading(false);
    }
  }, [isReloading]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLParagraphElement> = (
    e
  ) => {
    if (e.key === "Backspace") {
      // Wants to delete previous character/s
      // Links must be deleted from their components

      const sel = window.getSelection();
      const range = sel?.getRangeAt(0);
      if (!sel || !range) {
        return;
      }

      console.log(range);

      // If start and end offset are 0, check what's before

      // If cursor is at end or is using multiple containers common ancesor is paragraph
      if (range.commonAncestorContainer.nodeName === "P") {
        if (typeof parts[parts.length - 1] === "string") {
          // Delete as usual
          return;
        }
        // Links or multiple containers
        // Links:
        // Multiple:

        console.log(range);
        e.preventDefault();
        // Links must be deleted from their components
        return;
      }

      // Multiple characters selected
      if (range.endOffset - range.startOffset > 0) {
        if (range.commonAncestorContainer === range.startContainer) {
          // Same container
          if (
            range.endOffset - range.startOffset ===
            (range.commonAncestorContainer as any).length
          ) {
            // Deletes all characters
            e.preventDefault();
            if (!range.commonAncestorContainer.parentElement) {
              return;
            }
            range.commonAncestorContainer.parentElement.innerHTML = "";
          }
          // Deletes some characters, allow delete
          return;
        } else {
          e.preventDefault();
        }
        return;
      }

      // Element only has one char
      if ((sel?.anchorNode as any).data?.length === 1) {
        e.preventDefault();
        if (!sel.anchorNode?.parentElement) {
          return;
        }

        sel.anchorNode.parentElement.innerHTML = "";
        return;
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
                  deleteLink={() => {
                    setParts(parts.filter((_, j) => j !== i));
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
      if (section.textContent !== "") {
        text += section.textContent;
      }
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
