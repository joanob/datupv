import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { News } from "../../../types/News";

import "./NewsCard.css";

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, height } = useContainerSize(imgLoaded);

  const isHorizontalImage = news.image.width > news.image.height;

  const topPadding = height / 2;

  return (
    <div className="news" style={{ paddingTop: topPadding + "px" }}>
      <div
        ref={ref}
        className={
          isHorizontalImage
            ? "news-image news-image-horizontal"
            : "news-image news-image-vertical"
        }
      >
        <img
          src={news.image.url}
          onLoad={() => {
            setImgLoaded(true);
          }}
        />
      </div>
      <div className="newscard" style={{ paddingTop: topPadding + "px" }}>
        <h3 className="newscard-title">{news.title}</h3>
        <p className="newscard-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
          necessitatibus voluptas reprehenderit fugiat doloremque voluptates?
          Nisi odit possimus voluptate, minus assumenda enim dolorem hic omnis
          eum nam illo rerum quaerat.
        </p>
        <div className="newscard-extra">
          <p className="newscard-date">
            {new Date(news.datetime).toDateString()}
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
