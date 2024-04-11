import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import "./table.scss";

export default function Table({ leagueData }) {
  const data = useMemo(() => leagueData, [leagueData]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => "Team Name",
    }),
    columnHelper.accessor("faction", {
      cell: (info) => info.getValue(),
      header: () => "Faction",
    }),
    columnHelper.accessor("head_coach", {
      cell: (info) => info.getValue(),
      header: () => "Head Coach",
    }),
    columnHelper.accessor("points", {
      cell: (info) => (
        <div style={{ textAlign: "right" }}>{info.getValue()}</div>
      ),
      header: () => "Points",
    }),
    columnHelper.accessor("team_value", {
      cell: (info) => (
        <div style={{ textAlign: "right" }}>{info.getValue()}</div>
      ),
      header: () => "Team Value",
    }),
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="table">
        <thead className="table__head">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr className="table__head-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th className="table__head-text" key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="table__body">
          {table.getRowModel().rows.map((row) => (
            <tr className="table__body-row" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="table__body-text" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
