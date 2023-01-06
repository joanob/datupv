import React, { useState, useEffect, useRef, RefObject } from "react";
import { Link } from "react-router-dom";
import { getNavLinks } from "../../services";
import { NavLink } from "../../types";

import logoTransparent from "../../public/icons/logoTransparent.png";

import "./header.css";
import Navbar from "./Navbar";
import NavbarCollapsable from "./NavbarCollapsable";

const Header = () => {
  const containerRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLElement>(null);

  const { loading, collapse } = useHeaderWidth(containerRef, elementRef);

  const nav = useNav();

  return (
    <header ref={containerRef} className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoTransparent} alt="Logo de la delegación" />
        </Link>
      </div>
      {nav.length === 0 ? null : loading || !collapse ? (
        <nav ref={elementRef}>
          <Navbar nav={nav} visible={!loading} />
        </nav>
      ) : (
        <NavbarCollapsable nav={nav} />
      )}
    </header>
  );
};

const useHeaderWidth = (
  containerRef: RefObject<HTMLElement>,
  elementRef: RefObject<HTMLElement>
) => {
  const [minWidth, setMinWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [collapse, setCollapse] = useState(false);

  // On first render, minwidth === 0, width === 0 and collapse === false
  // If first render overflows, minwidth will be established and won't need to be changed again
  // If first render doesn't overflow, min width won't be corrent and will have to be recomputed on resize to get its final value

  useEffect(() => {
    if (containerRef.current === null || elementRef.current === null) {
      return;
    }
    if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
      // When on first render content overflows
      setMinWidth(containerRef.current.scrollWidth);
    }
    setWidth(containerRef.current.clientWidth);
    window.addEventListener("resize", () => {
      if (containerRef.current === null) {
        return;
      }
      setWidth(containerRef.current?.clientWidth);
    });
  }, [containerRef.current, elementRef.current]);

  useEffect(() => {
    if (containerRef.current === null || width === 0) {
      return;
    }

    if (minWidth === 0) {
      // minWidth hasn't been stablished yet
      // minWidth will be stablished when nav first overflows
      if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
        setMinWidth(containerRef.current.scrollWidth);
        setCollapse(true);
        return;
      }
      // If minwidth is not set yet, don't collapse
      setCollapse(false);
    } else {
      setCollapse(width < minWidth);
    }
  }, [width]);

  return {
    containerRef,
    elementRef,
    loading: width === 0,
    collapse,
  };
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
