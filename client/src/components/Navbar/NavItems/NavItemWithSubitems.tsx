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
    <ul className="nav-link-with-submenu">
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {navlink.text}
        <span>
          {isOpen ? <AiFillCaretUp width={15} /> : <AiFillCaretDown />}
        </span>
      </p>
      <ul
        style={{ display: isOpen ? "block" : "none" }}
        className="nav-link-items"
      >
        {navlink.sublinks !== undefined &&
          navlink.sublinks.map((sublink) => (
            <NavItem key={sublink.url} navLink={sublink} />
          ))}
      </ul>
    </ul>
  );
};

export default NavItemWithSubitems;
