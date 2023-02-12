import { useEffect, useState } from "react";
import { News } from "../../../types";
import NewsCard from "../NewsCard";

interface Props {
  news: News[];
}

const NewsFeedRow = ({ news }: Props) => {
  const [titleHeight, setTitleHeight] = useState(0);
  const [subtitleHeight, setSubtitleHeight] = useState(0);
  const [titleHeights, setTitleHeights] = useState<number[]>([]);
  const [subtitleHeights, setSubtitleHeights] = useState<number[]>([]);

  useEffect(() => {
    if (
      titleHeights.length !== news.length ||
      subtitleHeights.length !== news.length
    ) {
      return;
    }
    setTitleHeight(titleHeights.sort()[news.length - 1]);
    setSubtitleHeight(subtitleHeights.sort()[news.length - 1]);
  }, [titleHeights, subtitleHeights]);

  const newsRendered =
    1 +
    (titleHeights.length > subtitleHeights.length
      ? subtitleHeights.length
      : titleHeights.length);

  const newsToRender: News[] = JSON.parse(
    JSON.stringify(news.slice(0, newsRendered))
  );

  return (
    <>
      {newsToRender.map((article) => (
        <NewsCard
          key={article.url}
          news={article}
          onTitleHeightChange={(height) =>
            setTitleHeights([...titleHeights, height])
          }
          onSubtitleHeightChange={(height) =>
            setSubtitleHeights([...subtitleHeights, height])
          }
          titleHeight={titleHeight === 0 ? "auto" : titleHeight + "px"}
          subtitleHeight={subtitleHeight === 0 ? "auto" : subtitleHeight + "px"}
        />
      ))}
    </>
  );
};

export default NewsFeedRow;
