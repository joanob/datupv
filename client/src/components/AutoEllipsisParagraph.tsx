import { useState, useEffect, useRef } from "react";

interface Props {
  className?: string;
  fontSize: number;
  text: string;
}

const AutoEllipsisParagraph = ({ className, fontSize, text }: Props) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [lines, setLines] = useState(0);

  const computeLines = () => {
    if (pRef.current === null) return;

    // Line height: fontSize + 3px
    let maxLines = 0;
    while (maxLines * (fontSize + 3) < pRef.current.offsetHeight) {
      maxLines++;
    }
    if (maxLines * (fontSize + 3) > pRef.current.offsetHeight) {
      maxLines--;
    }
    maxLines = maxLines === 0 ? 1 : maxLines;

    setLines(maxLines);
  };

  useEffect(() => {
    computeLines();

    window.onresize = computeLines;
  }, [pRef.current]);

  return (
    <div ref={pRef}>
      <p
        className={className}
        style={{
          fontSize: fontSize,
          lineClamp: lines,
          WebkitLineClamp: lines,
        }}
      >
        {lines === 0 ? "" : text}
      </p>
    </div>
  );
};

export default AutoEllipsisParagraph;
