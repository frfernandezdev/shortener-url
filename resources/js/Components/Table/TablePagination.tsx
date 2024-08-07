import { cn } from "@/Utils";
import { MouseEventHandler } from "react";

export type TablePaginationProps = {
  total: number;
  page: number;
  perPage: number;
  hasMorePages: boolean;
  setPage?: (page: number) => void;
  onNext?: MouseEventHandler;
  onPrevious?: MouseEventHandler;
};

export function TablePagination({
  total,
  page,
  perPage,
  hasMorePages,
  setPage,
  onNext,
  onPrevious,
}: TablePaginationProps) {
  const renderPage = (_page: number) => (
    <li key={_page}>
      <button
        className={cn("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", _page === page ? "bg-gray-100" : "")}
        onClick={() => setPage?.call(null, _page)}
      >
        {_page}
      </button>
    </li>
  );

  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, index) => index + 1
  );

  const disabledPreviuosBtn = page === 1;
  const disabledNextBtn = !hasMorePages;

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-6"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {page > 1 ? (page -1) + perPage : page}-{page * perPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={onPrevious}
            disabled={disabledPreviuosBtn}
          >
            Previous
          </button>
        </li>
        {pages.map(renderPage)}
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={onNext}
            disabled={disabledNextBtn}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
