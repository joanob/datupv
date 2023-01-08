import { useEffect, useState } from "react";
import { getNewsfeed } from "../../services/newsService";
import { News } from "../../types/News";
import NewsCard from "./NewsCard";

import "./newsfeed.css";

const NewsFeed = () => {
  const news = useNews();

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="newsfeed">
      <h2 style={{ color: "var(--secondary)" }}>Últimas noticias</h2>
      {news.map((article) => (
        <NewsCard key={article.title} news={article} />
      ))}
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
