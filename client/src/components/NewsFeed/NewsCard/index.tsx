import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { News } from "../../../types/News";

import "./NewsCard.css";

interface Props {
  news: News;
}

const MAX_HEIGHT = 180;

const NewsCard = ({ news }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, width, height } = useContainerSize(imgLoaded);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    const imgFullHeight = (news.image.height / news.image.width) * width;
    if (imgFullHeight > MAX_HEIGHT) {
      setImgWidth((news.image.width / news.image.height) * MAX_HEIGHT);
    }
  }, [width]);

  // TODO: from css width 80% margin auto for all, use image ratio. if height > max_height, set inline width to div so height resizes properly. topPadding will be computed from new height
  // No need to create a new hook, width already changes on resize

  const topPadding =
    imgWidth === 0
      ? height / 2
      : ((news.image.height / news.image.width) * imgWidth) / 2;

  return (
    <div className="news" style={{ paddingTop: topPadding + "px" }}>
      <div ref={ref} className="news-image">
        <div style={{ width: imgWidth === 0 ? "100%" : imgWidth + "px" }}>
          <img
            src={news.image.url}
            onLoad={() => {
              setImgLoaded(true);
            }}
          />
        </div>
      </div>
      <div className="newscard" style={{ paddingTop: topPadding + "px" }}>
        <h3 className="newscard-title">{news.title}</h3>
        <p className="newscard-subtitle">{news.subtitle}</p>
        <div className="newscard-extra">
          <p className="newscard-date">
            {new Date(news.datetime)
              .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll("/", "-")}
          </p>
          <Link className="newscard-link" to={""}>
            Leer más
          </Link>
        </div>
      </div>
    </div>
  );
};

const useContainerSize = (load: any) => {
  const ref = useRef<HTMLDivElement>(null);
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

export default NewsCard;
