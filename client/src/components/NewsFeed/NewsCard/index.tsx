import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { News } from "../../../types/News";

import "./NewsCard.css";

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  const [imgContainerSize, imgContainerRef] = useContainerSize();

  const imgStyle: { width: "auto" | number; height: "auto" | number } =
    news.image.width > news.image.height
      ? { width: imgContainerSize.width, height: "auto" }
      : { width: "auto", height: imgContainerSize.height };

  if (imgContainerRef.current && imgStyle.width !== "auto") {
    // Horizontal image, limit width if it is would get larger than container height
    const originalImgRatio = news.image.width / news.image.height;
    const imgHeightKeepingRatio = imgStyle.width / originalImgRatio;
    const VERTICAL_MARGIN = 10;
    if (imgHeightKeepingRatio > imgContainerSize.height - VERTICAL_MARGIN) {
      const newHeight = imgContainerSize.height - VERTICAL_MARGIN;
      imgStyle.height = newHeight;
      imgStyle.width = "auto";
    }
  }

  const datetime = new Date(news.datetime);
  const date =
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  return (
    <article className="newscard">
      <div ref={imgContainerRef} className="newscard-image">
        <div className="newscard-image-container">
          {imgContainerSize.width !== 0 ? (
            <img src={news.image.url} style={imgStyle} />
          ) : null}
        </div>
      </div>
      <Link to={"/noticias/" + news.url}>
        <div className="newscard-body">
          <div className="newscard-body-date">{date}</div>
          <div className="newscard-body-title">{news.title}</div>
        </div>
      </Link>
    </article>
  );
};

interface Size {
  width: number;
  height: number;
}

const useContainerSize = (): [
  Size,
  MutableRefObject<HTMLDivElement | null>
] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (containerRef.current === null) {
        return;
      }
      setContainerSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    });
  }, []);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    setContainerSize({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
  }, [containerRef.current]);

  return [containerSize, containerRef];
};

export default NewsCard;
