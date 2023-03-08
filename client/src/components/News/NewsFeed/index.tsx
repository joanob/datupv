import { useEffect, useState } from "react";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { getNewsfeed } from "../../../services/newsService";
import { News } from "../../../types/News";
import NewsFeedRow from "../NewsFeedRow";

// Card 400px, gap 20px

const THREE_NEWS_PER_ROW = 400 * 3 + 20 * 2;
const TWO_NEWS_PER_ROW = 400 * 2 + 20;

const NewsFeed = () => {
  const news = useNews();
  const { ref, width } = useContainerSize(news.length);
  const [pages, setPages] = useState(1);
  const [newsPerRow, setNewsPerRow] = useState(3);

  useEffect(() => {
    if (width >= THREE_NEWS_PER_ROW) {
      // Two rows of 3
      setNewsPerRow(3);
    } else if (width >= TWO_NEWS_PER_ROW) {
      // Two rows of 2
      setNewsPerRow(2);
    } else {
      // Three rows of one
      setNewsPerRow(1);
    }
  }, [width]);

  if (news.length === 0) {
    return null;
  }

  const showLoadMoreButton =
    newsPerRow === 1
      ? 3 * pages * newsPerRow < news.length
      : 2 * pages * newsPerRow < news.length;

  return (
    <div ref={ref} className="newsfeed">
      <div className="newsfeed-feed">
        {Array(newsPerRow === 1 ? 3 * pages : 2 * pages)
          .fill(undefined)
          .map((_, i) => (
            <NewsFeedRow
              key={i}
              news={news.slice(newsPerRow * i, newsPerRow * i + newsPerRow)}
            />
          ))}
      </div>
      {showLoadMoreButton ? (
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
