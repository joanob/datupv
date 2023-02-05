import { useState } from "react";
import NavItem from "./NavItem";
import { NavLink } from "../../../types";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface Props {
  navlink: NavLink;
}

const NavItemWithSubitems = ({ navlink }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul
      className={
        isOpen
          ? " nav-link-with-submenu nav-link-with-submenu-active"
          : "nav-link-with-submenu"
      }
    >
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {navlink.texto}
        <span>
          {isOpen ? <AiFillCaretUp width={15} /> : <AiFillCaretDown />}
        </span>
      </p>
      <ul
        style={{ display: isOpen ? "block" : "none" }}
        className="nav-link-items"
      >
        {navlink.subenlaces !== undefined &&
          navlink.subenlaces.map((sublink) => (
            <NavItem key={sublink.url} navLink={sublink} />
          ))}
      </ul>
    </ul>
  );
};

export default NavItemWithSubitems;
