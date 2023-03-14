import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  InternalLink,
  textToLinkObjects,
} from "../../../helpers/linkParser";
import EditableLink from "./Link";

interface Props {
  text: string;
  setText: (text: string) => void;
  addSectionBelow: () => void;
  deleteSection: () => void;
}

const EditableText = ({
  text,
  setText,
  addSectionBelow,
  deleteSection,
}: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [parts, setParts] = useState(textToLinkObjects(text));
  const [isReloading, setIsReloading] = useState(false);

  const save = () => {
    if (!ref.current) {
      return;
    }
    const textHTML = htmlToText(ref.current);
    setText(textHTML);
    setParts(textToLinkObjects(textHTML));
    setIsReloading(true);
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

      // If multiple characters are selected, check all characters belong to the same tag
      // Don't allow deleting characters from multiple parents
      if (range.endOffset - range.startOffset > 0) {
        if (range.commonAncestorContainer === range.startContainer) {
          // Same container, check if all characters are selected
          if (
            range.endOffset - range.startOffset ===
            (range.commonAncestorContainer as any).length
          ) {
            // Deletes all characters
            e.preventDefault();
            // Sanity check
            if (!range.commonAncestorContainer.parentElement) {
              return;
            }
            range.commonAncestorContainer.parentElement.innerHTML = "";
          }
          // Not all characters are deleted, contine as default
        } else {
          // Multiple containers, dont allow deleting
          e.preventDefault();
          alert("No se puede borrar letras en diferentes lados de los enlaces");
        }
        return;
      }

      // Only one character is selected

      // If common ancestor is p, cursor is in the end
      if (range.commonAncestorContainer.nodeName.toLocaleLowerCase() === "p") {
        e.preventDefault();
        return;
      }

      // If offset is 1, set inner html to empty text to prevent element from deleting
      if (range.startOffset === 1 && range.endOffset === 1) {
        e.preventDefault();
        if (
          range.commonAncestorContainer.parentElement?.nodeName.toLowerCase() ===
          "p"
        ) {
          // Container is text and parent is p
          range.commonAncestorContainer.textContent = "";
          return;
        }
        // Sanity check
        if (!range.commonAncestorContainer.parentElement) {
          return;
        }
        range.commonAncestorContainer.parentElement.innerHTML = "";
        return;
      }

      // If offset is 0, previous element is a link
      if (range.startOffset === 0 && range.endOffset === 0) {
        e.preventDefault();
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
      <button onClick={addSectionBelow}>Add section</button>
      <button onClick={deleteSection}>Delete</button>
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
