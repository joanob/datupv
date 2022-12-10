import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNavLinks } from "../../services";
import { NavLink } from "../../types";

import logoTransparent from "../../public/icons/logoTransparent.png";

import "./header.css";
import Navbar from "./Navbar";
import NavbarCollapsable from "./NavbarCollapsable";

const Header = () => {
  const { containerRef, elementRef, loading, overflows } = useHeaderWidth();

  const nav = useNav();

  return (
    <header ref={containerRef} className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoTransparent} alt="Logo de la delegación" />
        </Link>
      </div>
      {nav.length === 0 ? null : loading || !overflows ? (
        <nav ref={elementRef}>
          <Navbar nav={nav} visible={!loading} />
        </nav>
      ) : (
        <NavbarCollapsable nav={nav} />
      )}
    </header>
  );
};

const useHeaderWidth = () => {
  const containerRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLElement>(null);
  const [minWidth, setMinWidth] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current === null || elementRef.current === null) {
      return;
    }
    setMinWidth(containerRef.current.scrollWidth);
    setWidth(containerRef.current.clientWidth);
  }, [elementRef.current]);

  window.addEventListener("resize", () => {
    if (containerRef.current === null) {
      return;
    }
    setWidth(containerRef.current?.clientWidth);
  });

  const overflows = width < minWidth;

  return { containerRef, elementRef, loading: minWidth === 0, overflows };
};

const useNav = (): NavLink[] => {
  const [nav, setNav] = useState<NavLink[]>([]);

  useEffect(() => {
    getNavLinks().then((res) => {
      setNav(res);
    });
  }, []);

  return nav;
};

export default Header;
