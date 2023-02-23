import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import { AdminNewsArticle } from "../types/AdminNewsArticle";
import NewsListItem from "./NewsListItem";

const AdminNewsList = () => {
  // newsList has the raw strapi implementation
  const [newsList, setNewsList] = useState<AdminNewsArticle[]>([]);
  const authToken = useContext(AuthTokenContext);

  useEffect(() => {
    axios
      .get(baseURL + "/content-manager/collection-types/api::news.news", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setNewsList(res.data.results);
      });
  }, []);

  return (
    <div>
      <h3>Noticias</h3>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>URL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((article) => (
            <NewsListItem key={article.id} article={article} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNewsList;
