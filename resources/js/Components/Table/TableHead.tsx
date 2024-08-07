export interface TableHeadCell {
  id: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export type TableHeadProps = {
  columns: TableHeadCell[];
};

export function TableHead({ columns }: TableHeadProps) {
  const renderColumn = ({ label }: TableHeadCell, index: number) => (
    <th key={index} scope="col" className="px-6 py-3">
      {label}
    </th>
  );

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>{columns.map(renderColumn)}</tr>
    </thead>
  );
}
