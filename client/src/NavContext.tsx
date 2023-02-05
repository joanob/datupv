import { useState, useEffect, createContext, PropsWithChildren } from "react";
import { getNavLinks } from "./services";
import { NavLink } from "./types";

export const NavContext = createContext<NavLink[]>([]);

const NavContextWrapper = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    getNavLinks()
      .then((res) => {
        setNavLinks(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return <NavContext.Provider value={navLinks}>{children}</NavContext.Provider>;
};

export default NavContextWrapper;
