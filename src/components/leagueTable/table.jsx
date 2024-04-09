import { useReactTable } from "@tanstack/react-table";
// import { useEffect } from "react";
import "./table.scss";

export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useReactTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>;
            })}
          </tr>;
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render(`cell`)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
