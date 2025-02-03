import { FaSpinner } from "react-icons/fa";

interface TableProps<T> {
  columns: {
    header: string;
    accessor: keyof T | string;
    render?: (row: T) => React.ReactNode;
  }[];
  data: T[];
  emptyMessage: string;
  loading?: boolean;
}

export const Table = <T,>({
  columns,
  data,
  emptyMessage,
  loading,
}: TableProps<T>) => {
  if (loading)
    return (
      <div className="p-4 text-center">
        <FaSpinner className="mx-auto animate-spin" />
      </div>
    );

  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(row)
                      : (row[column.accessor as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
