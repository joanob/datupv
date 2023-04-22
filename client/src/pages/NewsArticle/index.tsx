import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostBody from "../../features/Posts/PostBody";
import { getNews } from "../../services/newsService";
import { News } from "../../types";
import NotFound from "../NotFound";

import "../../styles/pages.scss";

const NewsArticle = () => {
  const { id } = useParams();
  if (id === undefined) {
    return <NotFound />;
  }

  const news = useNews(id);

  // True means loading
  if (news === true) {
    return <main className="main"></main>;
  }

  if (news === false) {
    return <NotFound />;
  }

  return (
    <main className="main newspage">
      <header>
        <h2>{news.titulo}</h2>
        <p className="subtitulo">{news.subtitulo}</p>
        <p className="date">
          {new Date(news.fecha)
            .toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replaceAll("/", "-")}
        </p>
      </header>
      <article className="article">
        <PostBody body={news.cuerpo} />
      </article>
    </main>
  );
};

const useNews = (id: string): News | boolean => {
  const [news, setNews] = useState<News>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews(id).then((res) => {
      if (res === null) {
        setLoading(false);
        return;
      }
      setNews(res);
    });
  }, []);

  return news ? news : loading;
};

export default NewsArticle;
