import { useEffect, useState } from "react";
import { getNewsfeed } from "../../../services/newsService";
import { News } from "../../../types/News";
import NewsCard from "../NewsCard";

import "./newsfeed.css";

const NewsFeed = () => {
  const news = useNews();

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="newsfeed">
      <div className="newsfeed-feed">
        {news.map((article) => (
          <NewsCard key={article.titulo} news={article} />
        ))}
      </div>
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
