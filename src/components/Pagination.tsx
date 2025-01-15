import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/Vars";

interface PaginationProps {
  count: number;
}

function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between w-full">
      <p className="ml-2 text-xl">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to <span className="font-semibold">{currentPage * PAGE_SIZE}</span> from{" "}
        <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className="flex items-center justify-center gap-2 px-4 py-2 text-lg font-medium text-gray-800 transition-all rounded-lg bg-gray-50 hover:bg-brand-600 hover:text-white disabled:bg-gray-200"
        >
          <HiChevronLeft className="w-6 h-6" />
          <span>Previous</span>
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className="flex items-center justify-center gap-2 px-4 py-2 text-lg font-medium text-gray-800 transition-all rounded-lg bg-gray-50 hover:bg-brand-600 hover:text-white disabled:bg-gray-200"
        >
          <HiChevronRight className="w-6 h-6" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
