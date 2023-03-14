import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import EditableText from "../Editable/Text";
import { AdminNewsArticle } from "../types/AdminNewsArticle";
import { TextComponent } from "../types/BodyTypes";

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
    const newBody = newArticle.cuerpo.map((bodyComponent) => {
      // New ids are created usign Math.random, they are all < 1
      if (bodyComponent.id < 1) {
        const componentWithoutId = JSON.parse(JSON.stringify(bodyComponent));
        delete componentWithoutId["id"];
        return componentWithoutId;
      }
      return bodyComponent;
    });
    axios.put(
      baseURL + "/content-manager/collection-types/api::news.news/" + id,
      { ...newArticle, cuerpo: newBody },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  };

  if (article.id === 0) {
    return <div></div>;
  }

  // FIXME: save all at once, saving parts triggers errors because it saves one section and deletes modifications on others

  return (
    <div>
      <h3>{article.titulo}</h3>
      <p>{article.subtitulo}</p>
      <button
        onClick={() => {
          const newSection: TextComponent = {
            id: Math.random(),
            __component: "posts.texto",
            texto: "",
          };
          const newBody = [newSection, ...article.cuerpo];
          setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
        }}
      >
        Add section
      </button>
      {article.cuerpo.map((bodyComponent, i) =>
        bodyComponent.__component === "posts.texto" ? (
          <EditableText
            key={bodyComponent.id}
            text={bodyComponent.texto}
            setText={(newText) => {
              const newBody = article.cuerpo;
              newBody[i].texto = newText;
              save({ ...article, cuerpo: newBody });
              setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
            }}
            addSectionBelow={() => {
              const newSection: TextComponent = {
                id: Math.random(),
                __component: "posts.texto",
                texto: "",
              };
              const newBody = [
                ...article.cuerpo.slice(0, i),
                newSection,
                ...article.cuerpo.slice(i),
              ];
              setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
            }}
            deleteSection={() => {
              if (confirm("¿Quieres borrar esta sección?")) {
                const newBody = article.cuerpo.filter((_, j) => i != j);
                save({ ...article, cuerpo: newBody });
                setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
              }
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
              key={bodyComponent.id}
              text={bodyComponent.texto}
              setText={(newText) => {
                const newBody = article.cuerpo;
                newBody[i].texto = newText;
                save({ ...article, cuerpo: newBody });
                setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
              }}
              addSectionBelow={() => {
                const newSection: TextComponent = {
                  id: Math.random(),
                  __component: "posts.texto",
                  texto: "",
                };
                const newBody = [
                  ...article.cuerpo.slice(0, i),
                  newSection,
                  ...article.cuerpo.slice(i),
                ];
                setArticle((prevState) => ({ ...prevState, cuerpo: newBody }));
              }}
              deleteSection={() => {
                if (confirm("¿Quieres borrar esta sección?")) {
                  const newBody = article.cuerpo.filter((_, j) => i != j);
                  save({ ...article, cuerpo: newBody });
                  setArticle((prevState) => ({
                    ...prevState,
                    cuerpo: newBody,
                  }));
                }
              }}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default NewsEditor;
