import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import mData from "./MOCK_DATA.json";
import { useMemo } from "react";

export default function BasicTable() {
  const data = useMemo(() => mData, []);
  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    { header: "First name", accessor: "first_name" },
    { header: "Last Name", accessor: "last_name" },
    { header: "Email", accessor: "email" },
    { header: "Gender", accessor: "gender" },
  ];

  const table = useReactTable({ data, columns });

  return <div>Basic Table</div>;
}
