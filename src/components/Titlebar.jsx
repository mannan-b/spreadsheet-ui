import React from 'react';

export default function Titlebar({ active, onTabChange }) {
  const breadcrumbs = [
    { id: 'Workspace', label: 'Workspace', icon: '' },
    { id: 'Folder 2', label: 'Folder 2', icon: '' },
    { id: 'Spreadsheet 3', label: 'Spreadsheet 3', icon: '' }
  ];

  return (
    <div className="flex items-center justify-between px-4 py-1 bg-white border-b border-gray-200">
      {/* Left side - Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <button>📑</button>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            <button
              onClick={() => onTabChange && onTabChange(crumb.id)}
              className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-md transition-colors bg-white hover:bg-gray-50 ${
                active === crumb.id
                  ? 'text-gray-700'
                  : 'text-gray-400'
              }`}
              
            >
              <span className="mr-1.5">{crumb.icon}</span>
              {crumb.label}
            </button>
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-400">›</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right side - Search and user info */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search within sheet"
            className="w-64 bg-gray-100 pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-700 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-sm text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
}