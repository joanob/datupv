import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import PagesListItem from "./PagesListItem";
import { AdminPage } from "../types/AdminPage";

const AdminPagesList = () => {
  // newsList has the raw strapi implementation
  const [pagesList, setPagesList] = useState<AdminPage[]>([]);
  const authToken = useContext(AuthTokenContext);

  useEffect(() => {
    axios
      .get(baseURL + "/content-manager/collection-types/api::page.page", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setPagesList(res.data.results);
      });
  }, []);

  return (
    <div>
      <h3>Noticias</h3>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Estado</th>
            <th>URL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagesList.map((page) => (
            <PagesListItem key={page.id} page={page} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPagesList;
