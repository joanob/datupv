import { Link } from "react-router-dom";
import { News } from "../../data/feed";
import AutoEllipsisParagraph from "../AutoEllipsisParagraph";

import "./SwiperNewsCard.css";

interface Props {
  article: News;
}

const SwiperNewsCard = ({ article }: Props) => {
  return (
    <div className="news-slide">
      <Link to={"/noticias/" + article.href}>
        <img src={article.imgSrc} draggable={false} />
        <div className="news-slide-data">
          <AutoEllipsisParagraph
            className="news-slide-data-title"
            fontSize={16}
            text={article.title}
          />
          {/* <p className="news-slide-data-date">{article.date}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default SwiperNewsCard;
