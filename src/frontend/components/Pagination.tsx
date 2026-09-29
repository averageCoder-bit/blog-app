import { useEffect, useState } from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);
  const [pageInput, setPageInput] = useState(String(currentPage));

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = () => {
    const page = Number(pageInput);

    if (!Number.isInteger(page)) {
      setPageInput(String(currentPage));
      return;
    }

    if (page < 1 || page > totalPages) {
      setPageInput(String(currentPage));
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="flex w-full items-center justify-center gap-3 py-10">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border px-3 py-2 text-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span>Showing</span>

        <input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onBlur={handlePageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageChange();
            }
          }}
          className="h-9 w-14 rounded-lg border px-2 text-center outline-none focus:border-gray-400"
        />

        <span>of {totalPages}</span>
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border px-3 py-2 text-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
