import { useState, useEffect, useRef } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

import logoTransparent from "../../public/icons/logoTransparent.png";
import instagramSVG from "../../public/icons/instagram.svg";
import twitterSVG from "../../public/icons/twitter.svg";
import { NavLink } from "../../types";

// TODO: millorar tots els components. Separar components de burger i desplegat per a que no es repetisquen keys

const NavItem = ({ url, text }: NavLink) => {
  return (
    <li className="nav-link">
      <Link to={url ? url : ""}>{text}</Link>
    </li>
  );
};

const NavItemWithSubitems = ({ text, url, sublinks, order }: NavLink) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul className="nav-link-with-submenu">
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {text}
        <span>
          {isOpen ? <AiFillCaretUp width={15} /> : <AiFillCaretDown />}
        </span>
      </p>
      <ul
        style={{ display: isOpen ? "block" : "none" }}
        className="nav-link-items"
      >
        {sublinks !== undefined &&
          sublinks.map((sublink) => (
            <NavItem
              key={sublink.url}
              text={sublink.text}
              url={sublink.url}
              order={sublink.order}
            />
          ))}
      </ul>
    </ul>
  );
};

interface HeaderProps {
  nav: NavLink[];
}

const Header = ({ nav }: HeaderProps) => {
  // DesktopMinWidth is the minimun header width to display navbar horizontally without overflow
  const [desktopMinWidth, setDesktopMinWidth] = useState<number | null>(null);
  // HeaderWidth is current header width. Triggers render to compare to desktopMinWidth
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /**
     * Initial render: headerRef gets its value,
     * handler is created with desktopMinWidth == null (initial value)
     * and handler is called to check if header is overflowing at first
     * Horizontal navbar overflowing is visible for a brief time
     *
     * Handler saves current headerWidth always and desktopMinWidth if header overflows
     *
     */
    const handleResize = () => {
      if (headerRef.current === null) {
        return;
      }
      setHeaderWidth(headerRef.current.clientWidth);
      if (headerRef.current.scrollWidth > headerRef.current.clientWidth) {
        if (desktopMinWidth == null) {
          setDesktopMinWidth(headerRef.current.clientWidth);
        }
      }
    };

    if (desktopMinWidth === null) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
  }, [headerRef.current, desktopMinWidth]);

  return (
    <header ref={headerRef} className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoTransparent} alt="Logo de la delegación" />
        </Link>
      </div>
      {desktopMinWidth == null || headerWidth > desktopMinWidth ? (
        <ul
          style={{ visibility: headerWidth === null ? "hidden" : "visible" }}
          className="nav nav-desktop"
        >
          {nav.map((navlink) =>
            navlink.sublinks ? (
              <NavItemWithSubitems
                key={navlink.url}
                url={navlink.url}
                text={navlink.text}
                order={navlink.order}
                sublinks={navlink.sublinks}
              />
            ) : (
              <NavItem
                key={navlink.url}
                text={navlink.text}
                url={navlink.url}
                order={navlink.order}
              />
            )
          )}
          <li className="nav-link nav-link-social">
            <a href="https://www.instagram.com/datupv" target="_blank">
              <img src={instagramSVG} alt="Síguenos en Instagram" />
            </a>
          </li>
          <li className="nav-link nav-link-social">
            <a href="https://twitter.com/datupv" target="_blank">
              <img src={twitterSVG} alt="Síguenos en Twitter" />
            </a>
          </li>
        </ul>
      ) : (
        <>
          <div
            className={isOpen ? "nav-toggle nav-toggle-open" : "nav-toggle"}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {!isOpen ? null : (
            <ul className="nav">
              {nav.map((navlink) =>
                navlink.sublinks ? (
                  <NavItemWithSubitems
                    key={navlink.url}
                    url={navlink.url}
                    text={navlink.text}
                    order={navlink.order}
                    sublinks={navlink.sublinks}
                  />
                ) : (
                  <NavItem
                    key={navlink.url}
                    text={navlink.text}
                    url={navlink.url}
                    order={navlink.order}
                  />
                )
              )}
              <li className="nav-link nav-link-social">
                <a href="https://www.instagram.com/datupv" target="_blank">
                  <img src={instagramSVG} alt="Síguenos en Instagram" />
                </a>
                <a href="https://twitter.com/datupv" target="_blank">
                  <img src={twitterSVG} alt="Síguenos en Twitter" />
                </a>
              </li>
            </ul>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
