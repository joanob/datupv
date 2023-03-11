import { Link } from "react-router-dom";
import { NavLink } from "../../../types";

import "./styles.scss";

interface Props {
  navLink: NavLink;
}

const NavItem = ({ navLink }: Props) => {
  return (
    <li className="nav-link">
      <Link to={navLink.url}>{navLink.texto}</Link>
    </li>
  );
};

export default NavItem;
