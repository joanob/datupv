import { PostBody as PostBodyType } from "../../../types/PostBody";
import ImgSection from "../ImgSection";
import TextSection from "../TextSection";
import ImageWithTextSection from "../ImgWithTextSection";
import PostHeader from "../PostHeader";
import ListSection from "../ListSection";
import TableSection from "../TableSection";

interface Props {
  body: PostBodyType;
}

const PostBody = ({ body }: Props) => {
  return (
    <>
      {body.map((section, i) => {
        switch (section.type) {
          case "text":
            return <TextSection key={i} text={section.texto} />;
          case "image":
            return <ImgSection key={i} image={section.image} />;
          case "image-with-text":
            return (
              <ImageWithTextSection
                key={i}
                image={section.image}
                text={section.texto}
                alignment={section.alineacion}
              />
            );
          case "header":
            return (
              <PostHeader key={i} tipo={section.tipo} texto={section.texto} />
            );
          case "list":
            return <ListSection key={i} list={section.list} />;
          case "table":
            return (
              <TableSection
                key={i}
                header={section.header}
                rows={section.rows}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default PostBody;
