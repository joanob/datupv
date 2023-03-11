import { useState, useEffect, RefObject } from "react";

export const useHeaderWidth = (
  containerRef: RefObject<HTMLElement>,
  elementRef: RefObject<HTMLElement>
) => {
  const [minWidth, setMinWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [collapse, setCollapse] = useState(false);

  // On first render, minwidth === 0, width === 0 and collapse === false
  // If first render overflows, minwidth will be established and won't need to be changed again
  // If first render doesn't overflow, min width won't be corrent and will have to be recomputed on resize to get its final value

  // Leave a 10px margin to avoid scrollbar to go over navbar

  useEffect(() => {
    if (containerRef.current === null || elementRef.current === null) {
      return;
    }
    if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
      // When on first render content overflows
      setMinWidth(containerRef.current.scrollWidth);
    }
    setWidth(containerRef.current.clientWidth);
    window.addEventListener("resize", () => {
      if (containerRef.current === null) {
        return;
      }
      setWidth(containerRef.current?.clientWidth);
    });
  }, [containerRef.current, elementRef.current]);

  useEffect(() => {
    if (containerRef.current === null || width === 0) {
      return;
    }

    if (minWidth === 0) {
      // minWidth hasn't been stablished yet
      // minWidth will be stablished when nav first overflows
      if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
        setMinWidth(containerRef.current.scrollWidth);
        setCollapse(true);
        return;
      }
      // If minwidth is not set yet, don't collapse
      setCollapse(false);
    } else {
      setCollapse(width < minWidth + 10);
    }
  }, [width]);

  return {
    containerRef,
    elementRef,
    loading: width === 0,
    collapse,
  };
};
