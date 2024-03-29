import { Link } from "react-router-dom";
import { dateToString } from "../../../helpers/date";
import { AdminNewsArticle } from "../types/AdminNewsArticle";

interface Props {
  article: AdminNewsArticle;
}

type ArticleStatus = "Disponible" | "Publicada" | "Borrador";

const NewsListItem = ({ article }: Props) => {
  const now = new Date();
  const fecha = new Date(article.fecha);

  const status: ArticleStatus =
    article.publishedAt === null
      ? "Borrador"
      : now.getTime() > fecha.getTime()
      ? "Disponible"
      : "Publicada";

  return (
    <tr>
      <td>{article.titulo}</td>
      <td>{dateToString(fecha)}</td>
      <td
        style={{
          color:
            status === "Disponible"
              ? "green"
              : status === "Publicada"
              ? "orange"
              : "red",
        }}
      >
        {status}
      </td>
      <td>{article.url}</td>
      <td>
        <Link to={"/editor/noticias/" + article.id}>Editar</Link>
      </td>
    </tr>
  );
};

export default NewsListItem;
