import { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { NavContext } from "./NavContext";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import NewsArticle from "./pages/NewsArticle";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import EditorPage from "./pages/Editor";

import NavPage from "./pages/NavPage";
import NotFound from "./pages/NotFound";

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="noticias/:id" element={<NewsArticle />} />
      <Route path="actividades" element={<Activities />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="editor/*" element={<EditorPage />} />
      <Route path="*" element={<AllRoutesRouter />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

const AllRoutesRouter = () => {
  const nav = useContext(NavContext);
  const { pathname } = useLocation();
  // first index is "" because all pathnames start with /
  const pathParts = pathname.split("/").slice(1);

  // Navigation: two levels

  if (pathParts.length <= 2) {
    const navPage = nav.find((navlink) => navlink.url === pathParts[0]);

    if (navPage !== undefined) {
      if (!navPage.subenlaces) {
        return <NavPage pageId={navPage.pagina ? navPage.pagina : ""} />;
      }

      const navSubpage = navPage.subenlaces.find(
        (subpage) => subpage.url === pathParts[1]
      );

      if (!navSubpage) {
        return <NotFound />;
      }

      if (!navSubpage.unapagina) {
        return <NavPage pageId={navSubpage.pagina ? navSubpage.pagina : ""} />;
      }

      // subpage could be samepage or different page

      return (
        <NavPage
          pageId={navPage.pagina ? navPage.pagina : ""}
          subPages={navPage.subenlaces}
          selectedSubPage={navSubpage}
        />
      );
    }
  }

  return <NotFound />;
};

export default Router;
