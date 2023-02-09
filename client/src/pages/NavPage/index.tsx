import { useState, useEffect } from "react";
import PostBody from "../../components/Posts/PostBody";
import { getPage } from "../../services/pageService";
import { NavLink, Page, SubLink } from "../../types";
import NotFound from "../NotFound";

interface Props {
  pageId: string;
  subPages?: NavLink["subenlaces"];
  selectedSubPage?: SubLink;
}

const NavPage = ({ pageId, subPages, selectedSubPage }: Props) => {
  const page = usePage(pageId);

  if (page === true) {
    return <main className="main"></main>;
  }

  if (page === false) {
    return <NotFound />;
  }

  return (
    <main className="main newspage">
      <h2>{page.titulo}</h2>
      <article className="article">
        <PostBody body={page.cuerpo} />
        {subPages?.map((loopSubPage) => (
          <SubPage
            key={loopSubPage.pagina}
            pageId={loopSubPage?.pagina ? loopSubPage.pagina : ""}
          />
        ))}
      </article>
    </main>
  );
};

// TODO: scroll on load if was the selected sublink
const SubPage = ({ pageId }: Props) => {
  const page = usePage(pageId);

  if (typeof page === "boolean") {
    return null;
  }

  return (
    <>
      <h3>{page.titulo}</h3>
      <PostBody body={page.cuerpo} />
    </>
  );
};

const usePage = (id: string) => {
  const [page, setPage] = useState<Page>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPage(id).then((res) => {
      if (res === null) {
        setLoading(false);
        return;
      }
      setPage(res);
    });
  }, [id]);

  return page ? page : loading;
};

export default NavPage;
