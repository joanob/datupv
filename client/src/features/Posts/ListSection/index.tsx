import { ListComponent } from "../../../types/PostBody";

interface Props {
  list: ListComponent["list"];
}

const ListSection = ({ list }: Props) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default ListSection;
