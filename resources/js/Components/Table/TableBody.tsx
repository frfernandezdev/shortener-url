import { TableHeadCell } from "./TableHead";

export type TableBodyProps = {
  columns: TableHeadCell[];
  rows: { [key: string]: any };
  onClickItem?: (rows: { [key: string]: any }) => void;
};

export function TableBody({ columns, rows, onClickItem }: TableBodyProps) {

  const renderColumn = (row: { [key: string]: any}) => ({ id, prefix, suffix }: TableHeadCell, index: number) => (
    <th key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-ellipsis overflow-hidden max-w-96">
      {prefix}{row[id]}{suffix}
    </th>
  );

  const renderRow = (row: { [key: string]: any}, index: number) => (
    <tr key={index} className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => onClickItem?.call(null, row)}>
  {columns.map(renderColumn(row))}
    </tr>
  )

  return <tbody>{rows.map(renderRow)}</tbody>;
}
