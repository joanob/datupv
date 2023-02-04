import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNews } from "../../services/newsService";
import { News } from "../../types";
import NotFound from "../NotFound";

import "./news.css";

const NewsPage = () => {
  const { id } = useParams();
  if (id === undefined) {
    return <NotFound />;
  }

  const news = useNews(id);
  if (news === false) {
    return <NotFound />;
  }
  if (news === true) {
    return <main className="main"></main>;
  }

  return (
    <main className="main">
      <h2>{news.titulo}</h2>
      <p className="subtitulo">{news.subtitulo}</p>
      <article>
        {news.cuerpo.map((section, i) => {
          switch (section.type) {
            case "text":
              return <p key={i}>{section.texto}</p>;
            case "image":
              return (
                <section className="img-container">
                  <img key={i} src={section.image.url} className="img" />
                </section>
              );
          }
        })}
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

export default NewsPage;
