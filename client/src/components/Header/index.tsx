import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNavLinks } from "../../services";
import { NavLink } from "../../types";

import logoTransparent from "../../public/icons/logoTransparent.png";

import "./header.css";
import Navbar from "./Navbar";
import NavbarCollapsable from "./NavbarCollapsable";

const Header = () => {
  const { containerRef, overflows } = useHeaderWidth();

  const nav = useNav();

  return (
    <header ref={containerRef} className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoTransparent} alt="Logo de la delegación" />
        </Link>
      </div>
      {!overflows || containerRef.current === null ? (
        <Navbar nav={nav} visible={containerRef.current !== null} />
      ) : (
        <NavbarCollapsable nav={nav} />
      )}
    </header>
  );
};

const useHeaderWidth = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [minWidth, setMinWidth] = useState(0);

  useEffect(() => {
    setMinWidth((currentMinWidth) => {
      if (containerRef.current === null) {
        return currentMinWidth;
      }
      if (currentMinWidth === 0) {
        return containerRef.current?.scrollWidth;
      }
      if (containerRef.current?.scrollWidth > currentMinWidth) {
        return containerRef.current?.scrollWidth;
      }
      return currentMinWidth;
    });
  }, [containerRef.current?.clientWidth, containerRef.current?.scrollWidth]);

  const overflows =
    containerRef.current && containerRef.current.clientWidth >= minWidth;

  return { containerRef, overflows };
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
