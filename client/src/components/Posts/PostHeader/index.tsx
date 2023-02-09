interface Props {
  texto: string;
  tipo: "primario" | "secundario" | "terciario";
}

const PostHeader = ({ texto, tipo }: Props) => {
  switch (tipo) {
    case "primario":
      return <h3>{texto}</h3>;
    case "secundario":
      return <h4>{texto}</h4>;
    case "terciario":
      return <h5>{texto}</h5>;
    default:
      return null;
  }
};

export default PostHeader;
