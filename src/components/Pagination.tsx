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
    <div className="flex items-center justify-between w-full flex-col my-2 gap-y-2  py-3 sm:flex-row">
      <p className="md:ms-2 md:text-xl text-[1.2rem] text-primaryBlue font-bold">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        from <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className="flex items-center justify-center gap-2 text-[1.1rem] px-2 pe-3 md:px-4 md:py-2 md:text-lg font-medium transition-all rounded-lg bg-secondaryBtnBg hover:bg-secondaryBtnHover text-mainBg disabled:bg-mutedText disabled:text-mainBg"
        >
          <HiChevronLeft className="md:w-6 md:h-6" />
          <span>Previous</span>
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className="flex items-center justify-center gap-2 text-[1.1rem] px-2 pe-3 md:px-4 md:py-2 md:text-lg font-medium transition-all rounded-lg bg-secondaryBtnBg hover:bg-secondaryBtnHover text-mainBg disabled:bg-mutedText disabled:text-mainBg"
        >
          <HiChevronRight className="w-6 h-6" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
