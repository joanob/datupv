import { Link } from "react-router-dom";
import { linkParser } from "../../../helpers/linkParser";

import "./textsection.css";

interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return linkParser(text);
};

export default TextSection;
