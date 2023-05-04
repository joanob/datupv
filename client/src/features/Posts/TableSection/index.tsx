import { textParser } from "../../../helpers/textParser";
import { TableComponent } from "../../../types/PostBody";

interface Props {
  header: TableComponent["header"];
  rows: TableComponent["rows"];
}

const TableSection = ({ header, rows }: Props) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {header.map((h) => (
              <td key={h}>{h}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((col) => (
                <td key={col}>{textParser(col)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
