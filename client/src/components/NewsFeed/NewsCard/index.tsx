import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { News } from "../../../types/News";

import "./NewsCard.css";

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  const imgContainerBoxRef = useRef<HTMLDivElement | null>(null);
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imgContainerBoxRef.current === null) {
      return;
    }
    setImgSize({
      width: imgContainerBoxRef.current.clientWidth,
      height: imgContainerBoxRef.current.clientHeight,
    });
  }, [imgContainerBoxRef.current]);

  const imgStyle =
    news.image.width > news.image.height
      ? { width: imgSize.width }
      : { height: imgSize.height };

  const datetime = new Date(news.datetime);
  const date =
    datetime.getDate() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getFullYear();

  return (
    <article className="newscard">
      <div className="newscard-image">
        <div ref={imgContainerBoxRef} className="newscard-image-container">
          <div className="newscard-image-container-box">
            {imgSize.width !== 0 ? (
              <img src={news.image.url} style={imgStyle} />
            ) : null}
          </div>
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

export default NewsCard;
