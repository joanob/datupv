import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthTokenContext } from "../../../pages/Editor";
import { baseURL } from "../../../services/config";
import EditableText from "../Editable/Text";
import { AdminPage } from "../types/AdminPage";

const PagesEditor = () => {
  const { id } = useParams();
  const authToken = useContext(AuthTokenContext);

  // Set initial empty article to avoid undefined errors
  const [page, setPage] = useState<AdminPage>({
    id: 0,
    publishedAt: "",
    url: "",
    titulo: "",
    subtitulo: "",
    cuerpo: [],
  });

  useEffect(() => {
    axios
      .get(baseURL + "/content-manager/collection-types/api::page.page/" + id, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        setPage(res.data);
      });
  }, []);

  const save = (newPage: AdminPage) => {
    axios.put(
      baseURL + "/content-manager/collection-types/api::page.page/" + id,
      newPage,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  };

  if (page.id === 0) {
    return <div></div>;
  }

  return (
    <div>
      <h3>{page.titulo}</h3>
      <p>{page.subtitulo}</p>
      {page.cuerpo.map((bodyComponent, i) =>
        bodyComponent.__component === "posts.texto" ? (
          <EditableText
            key={i}
            text={bodyComponent.texto}
            setText={(newText) => {
              const newBody = page.cuerpo;
              newBody[i].texto = newText;
              save({ ...page, cuerpo: newBody });
              setPage((prevState) => ({ ...prevState, cuerpo: newBody }));
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
                const newBody = page.cuerpo;
                newBody[i].texto = newText;
                save({ ...page, cuerpo: newBody });
                setPage((prevState) => ({ ...prevState, cuerpo: newBody }));
              }}
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default PagesEditor;
