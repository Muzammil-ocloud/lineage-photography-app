interface DataTableProps {
  heads: string[];
  rows: React.ReactNode[][];
}

export function DataTable({ heads, rows }: DataTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr
          className="border-b text-left text-xs text-slate-500"
          style={{ borderColor: "var(--lineage-line)" }}
        >
          {heads.map((h) => (
            <th key={h} className="px-5 py-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-b last:border-b-0 hover:bg-slate-50"
            style={{ borderColor: "#f0f2f5" }}
          >
            {row.map((cell, j) => (
              <td key={j} className="px-5 py-4 align-top">
                <span className={j === 0 ? "font-semibold" : "text-slate-600"}>
                  {cell}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
