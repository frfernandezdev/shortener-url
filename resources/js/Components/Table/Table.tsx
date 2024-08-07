import { MouseEventHandler } from "react";
import { TableBody } from "./TableBody";
import { TableHead, TableHeadCell } from "./TableHead";
import { TablePagination } from "./TablePagination";

export type TableProps = {
  columns: TableHeadCell[];
  rows: { [key: string]: any };
  onClickItem?: (row: { [key: string]: any }) => void;
  page: number;
  perPage: number;
  total: number;
  hasMorePages: boolean;
  setPage?: (page: number) => void;
  onNext?: MouseEventHandler;
  onPrevious?: MouseEventHandler;
};

export function Table({
  columns,
  rows,
  onClickItem,
  page,
  perPage,
  total,
  hasMorePages,
  setPage,
  onNext,
  onPrevious,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHead columns={columns} />
        <TableBody columns={columns} rows={rows} onClickItem={onClickItem} />
      </table>
      <TablePagination
        page={page}
        perPage={perPage}
        total={total}
        hasMorePages={hasMorePages}
        setPage={setPage}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
}
