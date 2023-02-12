import { useState, useEffect, useRef } from "react";

export const useContainerSize = (load: any) => {
  const ref =
    useRef<HTMLDivElement | HTMLParagraphElement | HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (ref.current === null) {
        return;
      }
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    });
  }, []);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [ref.current, load]);

  return { ref, width, height };
};
