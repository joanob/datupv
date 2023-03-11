import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { News } from "../../../types/News";

import "./styles.scss";

interface Props {
  news: News;
  onTitleHeightChange: (height: number) => void;
  onSubtitleHeightChange: (height: number) => void;
  titleHeight: string;
  subtitleHeight: string;
}

const MAX_HEIGHT = 180;

const NewsCard = ({
  news,
  onTitleHeightChange,
  onSubtitleHeightChange,
  titleHeight,
  subtitleHeight,
}: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, width, height } = useContainerSize(imgLoaded);
  const [imgWidth, setImgWidth] = useState(0);
  const titleSize = useContainerSize(imgLoaded);
  const subtitleSize = useContainerSize(imgLoaded);

  useEffect(() => {
    const imgFullHeight = (news.imagen.height / news.imagen.width) * width;
    if (imgFullHeight > MAX_HEIGHT) {
      setImgWidth((news.imagen.width / news.imagen.height) * MAX_HEIGHT);
    }
  }, [width]);

  useEffect(() => {
    if (
      (titleSize.height !== 0 && titleHeight === "auto") ||
      titleSize.height >
        parseInt(titleHeight.slice(0, titleHeight.length - 2), 10)
    ) {
      onTitleHeightChange(titleSize.height);
    }

    if (
      (subtitleSize.height !== 0 && subtitleHeight === "auto") ||
      subtitleSize.height >
        parseInt(subtitleHeight.slice(0, subtitleHeight.length - 2), 10)
    ) {
      onSubtitleHeightChange(subtitleSize.height);
    }
  }, [titleSize.height, subtitleSize.height]);

  const topPadding =
    imgWidth === 0
      ? height / 2
      : ((news.imagen.height / news.imagen.width) * imgWidth) / 2;

  return (
    <div className="newsfeed-news" style={{ paddingTop: topPadding + "px" }}>
      <div ref={ref} className="newsfeed-news-image">
        <div style={{ width: imgWidth === 0 ? "100%" : imgWidth + "px" }}>
          <img
            src={news.imagen.url}
            onLoad={() => {
              setImgLoaded(true);
            }}
          />
        </div>
      </div>
      <div
        className="newsfeed-card"
        style={{ paddingTop: MAX_HEIGHT / 2 + "px" }}
      >
        <h3
          ref={titleSize.ref}
          className="newsfeed-card-title"
          style={{ height: titleHeight }}
        >
          <Link to={"/noticias/" + news.url}>{news.titulo}</Link>
        </h3>
        <p
          ref={subtitleSize.ref}
          className="newsfeed-card-subtitle"
          style={{ height: subtitleHeight }}
        >
          {news.subtitulo}
        </p>
        <div className="newsfeed-card-extra">
          <p className="newsfeed-card-date">
            {new Date(news.fecha)
              .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll("/", "-")}
          </p>
          <Link className="newsfeed-card-link" to={"/noticias/" + news.url}>
            Leer más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
