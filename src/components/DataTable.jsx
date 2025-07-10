import React, { useState } from 'react';

export default function DataTable({ data, setData }) {
  const rows = 30;
  const cols = 10;
  const cellHeight = 48;
  const rowHeaderWidth = 50;

  // State to track active cell - default to first data cell (row 1, col 0)
  const [activeCell, setActiveCell] = useState({ row: 1, col: 0 });

  const handleChange = (r, c, value) => {
    const key = `${r},${c}`;
    setData((prev) => {
      const updated = { ...prev };
      if (value === "") {
        delete updated[key];
      } else {
        updated[key] = value;
      }
      return updated;
    });
  };

  const getColLabel = (i) => {
    let label = "";
    while (i >= 0) {
      label = String.fromCharCode((i % 26) + 65) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    const statusConfig = {
      'In-process': "bg-yellow-100 text-yellow-800 border-yellow-200",
      'Blocked': "bg-red-100 text-red-800 border-red-200",
      'Completed': "bg-green-100 text-green-800 border-green-200",
      'Complete': "bg-green-100 text-green-800 border-green-200",
      'Need to start': "bg-blue-100 text-blue-800 border-blue-200"
    };
    const config = statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
    return (
      <span className={`px-2 py-1 rounded-xl text-center text-xs font-medium border ${config}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    if (!priority) return null;
    const priorityConfig = {
      'High': "text-red-500",
      'Medium': "text-yellow-500",
      'Low': "text-green-500"
    };
    const config = priorityConfig[priority] || "text-gray-500";
    return (
      <span className={`font-medium text-xs text-center ${config}`}>
        {priority}
      </span>
    );
  };

  const align = (c) =>{
    if(c==0 || c==3 || c==4 || c==5) return "text-left";
    else return "text-right";
  }

  const formatCellValue = (value, colIndex) => {
    // Status column (index 2)
    if (colIndex === 2) {
      return getStatusBadge(value);
    }
    // Priority column (index 6)
    if (colIndex === 6) {
      return getPriorityBadge(value);
    }
    // Est Value column (index 8) - add currency formatting
    if (colIndex === 8 && value) {
      return `₹${value}`;
    }
    return value;
  };

  // Get super headers and column headers info from data
  const superHeaders = data._superHeaders || [];
  const columnHeaders = data._columnHeaders || [];

  return (
    <div className="w-full h-full overflow-auto bg-white" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <table className="w-full border-collapse border-0">
        <thead className="sticky top-0 z-20">
          {/* Super Headers Row */}
          <tr className="border-b-0">
            <th className="w-12 h-10 bg-white border-r border-gray-300 text-xs font-medium text-gray-700 sticky left-0 z-30"></th>
            {superHeaders.map((header, index) => (
              <th
                key={index}
                colSpan={header.colspan}
                className={`h-10 px-3 text-xs font-medium text-gray-700 border-r border-gray-300 text-left border-b-0 ${header.class}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
          {/* Column Headers Row */}
          <tr className="border-t-0">
            <th className="w-12 h-10 bg-gray-100 border-r border-gray-300 text-xs font-medium text-gray-700 sticky left-0 z-30">#</th>
            {Array.from({ length: cols }).map((_, c) => {
              const columnHeader = columnHeaders[c];
              return (
                <th
                  key={c}
                  className={`h-10 px-3 text-xs font-medium border-r border-gray-300 text-left border-b-0 ${
                    columnHeader ? `${columnHeader.bgColor} ${columnHeader.textColor} ${columnHeader.width}` : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {columnHeader ? columnHeader.label : (data[`0,${c}`] || getColLabel(c))}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="border-t-0">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b border-gray-200">
              <th className="w-12 h-10 bg-gray-100 border-r border-gray-300 text-xs font-medium text-gray-700 sticky left-0 z-10">
                {r + 1}
              </th>
              {Array.from({ length: cols }).map((_, c) => {
                const key = `${r + 1},${c}`;
                const value = data[key] || "";
                const isStatusOrPriority = c === 2 || c === 6;
                const isActiveCell = activeCell.row === r + 1 && activeCell.col === c;
                const columnHeader = columnHeaders[c];

                return (
                  <td
                    key={c}
                    className={`h-10 px-3 text-xs ${
                      columnHeader ? columnHeader.width : 'w-32'
                    } ${
                          isActiveCell ? 'border-4 border-green-700 rounded' : 'border-r border-gray-300'
                        }`}
                  >
                    {isStatusOrPriority ? (
                      <div className="flex justify-center items-center h-full rounded-xl">
                        {formatCellValue(value, c)}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(r + 1, c, e.target.value)}
                        onFocus={() => setActiveCell({ row: r + 1, col: c })}
                        className={`w-full h-full bg-transparent outline-none focus:ring-0 text-xs ${align(c)}`}
                        placeholder=""
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}