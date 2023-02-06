import { PostBody as PostBodyType } from "../../../types/PostBody";
import ImgSection from "../ImgSection";
import TextSection from "../TextSection";

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
        }
      })}
    </>
  );
};

export default PostBody;
