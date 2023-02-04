interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return <p>{text}</p>;
};

export default TextSection;
