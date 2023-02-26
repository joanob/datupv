import { useState, useEffect } from "react";
import { ExternalLink, InternalLink } from "../../../helpers/linkParser";

import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface Props {
  link: InternalLink | ExternalLink;
  setLink: (link: InternalLink | ExternalLink) => void;
}

interface FormData {
  texto: string;
  link: string;
  isExternal: boolean;
}

const EditableLink = ({ link, setLink }: Props) => {
  const [state, setState] = useState({
    isActive: false,
    clickedOutside: false,
  });

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

  return (
    <span
      ref={ref}
      onClick={handleClick}
      contentEditable="false"
      suppressContentEditableWarning
    >
      {state.isActive ? (
        <span>
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
        </span>
      ) : (
        formData.texto
      )}
    </span>
  );
};

export default EditableLink;
