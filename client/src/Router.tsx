import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavContext } from "./NavContext";
import NotFound from "./pages/NotFound";

const Router = () => {
  const nav = useContext(NavContext);
  const { pathname } = useLocation();
  // first index is "" because all pathnames start with /
  const pathParts = pathname.split("/").slice(1);

  // Navigation: two levels

  if (pathParts.length <= 2) {
    const navPage = nav.find((navlink) => navlink.url === pathParts[0]);

    if (navPage !== undefined) {
      if (!navPage.subenlaces) {
        return <h3>{navPage?.texto}</h3>;
      }

      const navSubpage = navPage.subenlaces.find(
        (subpage) => subpage.url === pathParts[1]
      );

      if (!navSubpage) {
        return <NotFound />;
      }

      return <h3>{navPage.texto + " / " + navSubpage.texto}</h3>;
    }
  }

  return <NotFound />;
};

export default Router;
