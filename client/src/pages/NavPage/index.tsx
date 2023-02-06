import { useState, useEffect } from "react";
import { getPage } from "../../services/pageService";
import { Page } from "../../types";
import NotFound from "../NotFound";

interface Props {
  pageId: string;
}

const NavPage = ({ pageId }: Props) => {
  const page = usePage(pageId);

  if (page === true) {
    return <main className="main"></main>;
  }

  if (page === false) {
    return <NotFound />;
  }

  return <main className="main">{page.titulo}</main>;
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
  }, []);

  return page ? page : loading;
};

export default NavPage;
