interface Props {
  texto: string;
  tipo: "primario" | "secundario" | "terciario";
}

const PostHeader = ({ texto, tipo }: Props) => {
  if (tipo === "primario") {
    return <h3 key={texto}>{texto}</h3>;
  }

  if (tipo === "secundario") {
    return <h3 key={texto}>{texto}</h3>;
  }

  if (tipo === "terciario") {
    return <h3 key={texto}>{texto}</h3>;
  }

  return null;
};

export default PostHeader;
