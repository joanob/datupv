import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import { AuthTokenContext } from '../../../pages/Editor'
import { AdminNewsArticle } from "../types/AdminNewsArticle";
import axios from "axios";
import { baseURL } from "../../../services/config";
import PostBody from "../../Posts/PostBody";
import { resBodyToPostBody } from "../../../services/helpers";

const NewsPreview = () => {
  const {id} = useParams()
  const authToken = useContext(AuthTokenContext)

  const [article, setArticle] = useState<AdminNewsArticle>({
    id: 0,
    publishedAt: "",
    fecha: "",
    url: "",
    titulo: "",
    subtitulo: "",
    cuerpo: [],
  });

  useEffect(() => {
    axios
      .get(baseURL + "/content-manager/collection-types/api::news.news/" + id, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setArticle(res.data);
      });
  }, []);

  const body = resBodyToPostBody(article.cuerpo)

  return (
    <main className="main newspage">
      <header>
        <h2>{article.titulo}</h2>
        <p className="subtitulo">{article.subtitulo}</p>
        <p className="date">
          Previsualización
        </p>
      </header>
      <article className="article">
        <PostBody body={body} />
      </article>
    </main>
  )
}

export default NewsPreview