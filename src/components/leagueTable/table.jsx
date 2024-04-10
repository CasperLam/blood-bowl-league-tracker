import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import "./table.scss";

export default function Table({ leagueData }) {
  const data = useMemo(() => leagueData, [leagueData]);

  const columns = [
    {
      header: "Team Name",
      accessor: "name",
    },
    {
      header: "Faction",
      accessor: "faction",
    },
    {
      header: "Head Coach",
      accessor: "head_coach",
    },
    {
      header: "Points",
      accessor: "points",
    },
    {
      header: "Team Value",
      accessor: "team_value",
    },
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
