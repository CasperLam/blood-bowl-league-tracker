import { useReactTable } from "@tanstack/react-table";
import { useEffect } from "react";

export default function Table({}) {
  const columns = [
    {
      Header: `Team Name`,
      accessor: `name`,
    },
    {
      Header: `Faction`,
      accessor: `faction`,
    },
    {
      Header: `Head Coach`,
      accessor: `head_coach`,
    },
    {
      Header: `Points`,
      accessor: `points`,
    },
    {
      Header: `Team Value`,
      accessor: `team_value`,
    },
  ];

  const renderColumns = useEffect(() => columns, []);
  // const renderData = useEffect(() => data, [])

  const tableInstance = useReactTable({
    columns: renderColumns,
  });

  return <table className="table"></table>;
}
