import { useState, useEffect } from "react";
import PostBody from "../../features/Posts/PostBody";
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
      <header>
        <h2>{page.titulo}</h2>
      </header>
      <article className="article">
        <PostBody body={page.cuerpo} />
        {subPages?.map((subpage) => (
          <SubPage
            key={subpage.pagina}
            selectedSubPage={selectedSubPage}
            pageId={subpage?.pagina ? subpage.pagina : ""}
          />
        ))}
      </article>
    </main>
  );
};

const SubPage = ({ pageId, selectedSubPage }: Props) => {
  const page = usePage(pageId);

  useEffect(() => {
    if (typeof page === "boolean") {
      return;
    }
    if (pageId === selectedSubPage?.pagina) {
      setTimeout(() => {
        document
          .getElementById("section-" + pageId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [page, selectedSubPage]);

  if (typeof page === "boolean") {
    return null;
  }

  return (
    <>
      <h3 id={"section-" + pageId}>{page.titulo}</h3>
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
