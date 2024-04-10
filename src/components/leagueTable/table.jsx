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
      cell: (info) => info.getValue(),
      header: () => "Points",
    }),
    columnHelper.accessor("team_value", {
      cell: (info) => info.getValue(),
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
