import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: Props) => {
  if (totalPages < 2) {
    return null;
  }

  const pages: number[] = [1];

  // 7 + 2 icons is the max width
  if (totalPages <= 7) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  // Get first, intermediates and last
  // Or initials and last if selected is < 4
  // Or first and finals if selected is two units or less from total
  if (totalPages > 7) {
    if (page < 4) {
      for (let i = 2; i < 7; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    }
    if (totalPages - page <= 2) {
      for (let i = totalPages - 5; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    if (page >= 4 && totalPages - page > 2) {
      for (let i = page - 2; i <= page + 2; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    }
  }

  // n has to be at least 4

  // 9 elements: < 1 n-2 n-1 n n+1 n+2 max >

  return (
    <nav aria-label="paginación" className="pagination">
      <ul>
        <li className={page === 1 ? "pagination--unactive" : ""}>
          <button
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
          >
            <FaAngleLeft />
          </button>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <button
              className={page === p ? "pagination--active" : ""}
              onClick={() => {
                setPage(p);
              }}
            >
              {p}
            </button>
          </li>
        ))}
        <li className={page === totalPages ? "pagination--unactive" : ""}>
          <button
            onClick={() => {
              if (page !== totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
