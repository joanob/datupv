import { useEffect, useState } from "react";
import { getNewsfeed } from "../../services/newsService";
import { News } from "../../types/News";
import NewsCard from "./NewsCard";

import "./newsfeed.css";

const NewsFeed = () => {
  const news = useNews();

  return (
    <div className="newsfeed">
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
