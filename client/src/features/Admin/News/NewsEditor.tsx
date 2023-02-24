import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import EditableText from "../EditableBody/EditableText";
import { AdminNewsArticle } from "../types/AdminNewsArticle";

const NewsEditor = () => {
  const { id } = useParams();
  const authToken = useContext(AuthTokenContext);

  // Set initial empty article to avoid undefined errors
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

  const handleSave = () => {
    axios.put(
      baseURL + "/content-manager/collection-types/api::news.news/" + id,
      article,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  };

  if (article.id === 0) {
    return <div></div>;
  }

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <h3>{article.titulo}</h3>
      <EditableText
        text={article.subtitulo}
        setText={(newSubtitle) => {
          setArticle((prevState) => ({ ...prevState, subtitulo: newSubtitle }));
        }}
      />
    </div>
  );
};

export default NewsEditor;
