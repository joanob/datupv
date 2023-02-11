import { useEffect, useState } from "react";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { getNewsfeed } from "../../../services/newsService";
import { News } from "../../../types/News";
import NewsCard from "../NewsCard";

import "./newsfeed.css";

// Card 400px, gap 20px

const THREE_NEWS_PER_ROW = 400 * 3 + 20 * 2;
const TWO_NEWS_PER_ROW = 400 * 2 + 20;

const NewsFeed = () => {
  const news = useNews();
  const { ref, width } = useContainerSize(news.length);
  const [pages, setPages] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(3);

  useEffect(() => {
    if (width >= THREE_NEWS_PER_ROW) {
      // Two columns of 3
      setNewsPerPage(6);
    } else if (width >= TWO_NEWS_PER_ROW) {
      // Two columns of 2
      setNewsPerPage(4);
    } else {
      // A column of three
      setNewsPerPage(3);
    }
  }, [width]);

  if (news.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="newsfeed">
      <div className="newsfeed-feed">
        {news.slice(0, pages * newsPerPage).map((article) => (
          <NewsCard key={article.url} news={article} />
        ))}
      </div>
      {pages * newsPerPage < news.length ? (
        <button
          className="newsfeed-load-more"
          onClick={() => {
            setPages((page) => page + 1);
          }}
        >
          Cargar más noticias
        </button>
      ) : null}
    </div>
  );
};

const useNews = (): News[] => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    getNewsfeed().then((res) => {
      setNews(res);
    });
  }, []);

  return news;
};

export default NewsFeed;
