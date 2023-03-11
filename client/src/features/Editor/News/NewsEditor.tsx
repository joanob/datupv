import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import EditableText from "../Editable/Text";
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

  const save = (newArticle: AdminNewsArticle) => {
    axios.put(
      baseURL + "/content-manager/collection-types/api::news.news/" + id,
      newArticle,
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
      <h3>{article.titulo}</h3>
      <p>{article.subtitulo}</p>
      {article.cuerpo.map((bodyComponent, i) =>
        bodyComponent.__component === "posts.texto" ? (
          <EditableText
            key={i}
            text={bodyComponent.texto}
            setText={(newText) => {
              const newBody = article.cuerpo;
              newBody[i].texto = newText;
              save({ ...article, cuerpo: newBody });
              setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
            }}
          />
        ) : bodyComponent.__component === "posts.imagen-con-texto" ? (
          <div key={i}>
            <p>
              Imagen con {bodyComponent.alineacion}{" "}
              <a href={bodyComponent.imagen.url} target="__blank">
                imagen
              </a>
            </p>
            <EditableText
              key={i}
              text={bodyComponent.texto}
              setText={(newText) => {
                const newBody = article.cuerpo;
                newBody[i].texto = newText;
                save({ ...article, cuerpo: newBody });
                setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
              }}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default NewsEditor;
