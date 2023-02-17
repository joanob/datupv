import { Link } from "react-router-dom";
import { linkParser } from "../../../helpers/linkParser";

interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return linkParser(text);
};

export default TextSection;
