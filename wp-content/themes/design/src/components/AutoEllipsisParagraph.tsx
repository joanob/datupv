import { useState, useEffect, useRef } from "react";

interface Props {
  className?: string;
  fontSize: number;
  text: string;
}

const AutoEllipsisParagraph = ({ className, fontSize, text }: Props) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [clampedText, setClampedText] = useState("");
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (pRef.current === null) return;
    if (clampedText !== "") return;

    // Line height: fontSize + 3px
    let maxLines = 0;
    while (maxLines * (fontSize + 3) < pRef.current.offsetHeight) {
      maxLines++;
    }
    if (maxLines * (fontSize + 3) > pRef.current.offsetHeight) {
      maxLines--;
    }

    // Adapt chars per line
    const charsPerLine = 20;
    const maxChars = charsPerLine * maxLines;

    if (text.length < maxChars) {
      setClampedText(text);
      return;
    }

    setClampedText(text.slice(0, charsPerLine * maxLines - 3));
    setIsClamped(true);
  }, [pRef.current]);

  return (
    <p ref={pRef} className={className} style={{ fontSize: fontSize }}>
      {clampedText} {isClamped ? "..." : ""}
    </p>
  );
};

export default AutoEllipsisParagraph;
