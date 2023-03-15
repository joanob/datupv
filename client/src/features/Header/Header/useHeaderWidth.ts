import { useState, useEffect, RefObject } from "react";

export const useHeaderWidth = (containerRef: RefObject<HTMLElement>) => {
  const [firstLoadWidth, setFirstLoadWidth] = useState(0);
  const [minWidth, setMinWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [collapse, setCollapse] = useState(false);

  const HEADER_HORIZONTAL_MARGIN = 20;

  // On first render, minwidth === 0, width === 0 and collapse === false
  // If first render overflows, minwidth will be established and won't need to be changed again
  // If first render doesn't overflow, min width won't be current and will have to be recomputed on resize to get its final value

  // FIXME: header-desktop shows when getting min width from loading

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (containerRef.current === null || rootElement === null) {
      return;
    }

    if (firstLoadWidth === 0) {
      setFirstLoadWidth(containerRef.current.scrollWidth);
      return;
    }

    // I don't know why, containerRef has a scroll width the two first renders and then it has another scroll width exactly 15 pixels lower
    // This hot fix works on chrome, firefox and opera

    if (
      containerRef.current.scrollWidth + 2 * HEADER_HORIZONTAL_MARGIN >
        rootElement.clientWidth &&
      containerRef.current.scrollWidth === firstLoadWidth - 15
    ) {
      // When on first render content overflows
      setMinWidth(
        containerRef.current.scrollWidth + 2 * HEADER_HORIZONTAL_MARGIN
      );
    }
    setWidth(rootElement.clientWidth);
    window.addEventListener("resize", () => {
      setWidth(rootElement.clientWidth);
    });
  }, [containerRef.current]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (containerRef.current === null || width === 0 || rootElement === null) {
      return;
    }

    if (minWidth === 0) {
      // minWidth hasn't been stablished yet
      // minWidth will be stablished when nav first overflows
      if (
        containerRef.current.scrollWidth + 2 * HEADER_HORIZONTAL_MARGIN >
        rootElement.clientWidth
      ) {
        setMinWidth(
          containerRef.current.scrollWidth + 2 * HEADER_HORIZONTAL_MARGIN
        );
        setCollapse(true);
      }
    } else {
      // Width has changed and min width is valid
      setCollapse(width < minWidth);
    }
  }, [width]);

  return {
    containerRef,
    loading: width === 0,
    collapse,
  };
};
