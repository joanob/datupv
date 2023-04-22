import { Link } from "react-router-dom";
import { dateToString } from "../../../helpers/date";
import { AdminPage } from "../types/AdminPage";

interface Props {
  page: AdminPage;
}

type PageStatus = "Disponible" | "Publicada" | "Borrador";

const PagesListItem = ({ page }: Props) => {
  const status: PageStatus =
    page.publishedAt === null ? "Borrador" : "Publicada";

  return (
    <tr>
      <td>{page.titulo}</td>
      <td
        style={{
          color: status === "Publicada" ? "green" : "red",
        }}
      >
        {status}
      </td>
      <td>{page.url}</td>
      <td>
        <Link to={"/editor/paginas/ver/" + page.id}>Ver</Link>
      </td>
    </tr>
  );
};

export default PagesListItem;
