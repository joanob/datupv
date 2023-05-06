import { useState, useEffect } from "react";
import { ExternalLink, InternalLink } from "../../../helpers/textParser";

import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface Props {
  link: InternalLink | ExternalLink;
  setLink: (link: InternalLink | ExternalLink) => void;
  deleteLink: () => void;
}

interface FormData {
  texto: string;
  link: string;
  isExternal: boolean;
}

const EditableLink = ({ link, setLink, deleteLink }: Props) => {
  const [state, setState] = useState({
    isActive: false,
    clickedOutside: false,
  });
  const [viewAsText, setViewAsText] = useState(false);

  const [formData, setFormData] = useState<FormData>(
    (link as InternalLink).link !== undefined
      ? {
        texto: link.texto,
        link: (link as InternalLink).link,
        isExternal: false,
      }
      : {
        texto: link.texto,
        link: (link as ExternalLink).url,
        isExternal: true,
      }
  );

  const ref = useOutsideClick(() => {
    setState((prevState) => {
      if (prevState.isActive) {
        return { isActive: true, clickedOutside: true };
      }
      return prevState;
    });
  });

  useEffect(() => {
    if (state.clickedOutside && state.isActive) {
      const newLink = formData.isExternal
        ? { texto: formData.texto, url: formData.link }
        : { texto: formData.texto, link: formData.link };
      setLink(newLink);
      setState({ isActive: false, clickedOutside: false });
    }
  }, [state, formData]);

  const handleClick = () => {
    setState((prevState) => ({ ...prevState, isActive: true }));
  };

  if (viewAsText) {
    return <span>{JSON.stringify(link)}</span>;
  }

  return (
    <span
      ref={ref}
      onClick={handleClick}
      contentEditable="false"
      suppressContentEditableWarning
      style={{ position: "relative", color: "red" }}
    >
      {formData.texto === "" ? "--enlace--" : formData.texto}
      <span
        style={{
          display: state.isActive ? "block" : "none",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
        }}
      >
        <input
          type="text"
          placeholder="Texto"
          value={formData.texto}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              texto: e.target.value,
            }));
          }}
        />
        <input
          type="text"
          placeholder="Enlace"
          value={formData.link}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              link: e.target.value,
            }));
          }}
        />
        <input
          type="checkbox"
          checked={formData.isExternal}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              isExternal: e.target.checked,
            }));
          }}
        />
        <button
          onClick={() => {
            setViewAsText(true);
          }}
        >
          To text
        </button>
        <button
          onClick={() => {
            deleteLink();
          }}
        >
          Delete
        </button>
      </span>
    </span>
  );
};

export default EditableLink;
