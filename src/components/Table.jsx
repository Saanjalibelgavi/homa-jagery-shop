export default function Table({ columns, data, rowActions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-earthy-light bg-white sticky top-0">
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
            {rowActions && <th className="text-left py-4 px-6 text-sm font-semibold text-earthy-brown">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (rowActions ? 1 : 0)}
                className="text-center py-8 text-earthy-brown"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="border-b border-earthy-light hover:bg-earthy-cream transition"
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-4 px-6 text-sm text-earthy-dark">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {rowActions && (
                  <td className="py-4 px-6 text-sm">
                    <div className="flex gap-2">
                      {rowActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(row)}
                          className={`p-2 rounded transition ${action.className}`}
                          title={action.title}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
