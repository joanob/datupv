import { useRef } from "react";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const EditableText = ({ text, setText }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const handleBlur = (e: any) => {
    setText(e.target.innerHTML.replace("&nbsp;", ""));
  };

  return (
    <p
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
    >
      {text}
    </p>
  );
};

export default EditableText;
