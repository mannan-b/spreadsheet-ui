import React from 'react';

export default function Tabs({ active, onTabChange }) {
  const tabs = [
    { id: 'All Orders', label: 'All Orders' },
    { id: 'Pending', label: 'Pending' },
    { id: 'Reviewed', label: 'Reviewed' },
    { id: 'Arrived', label: 'Arrived' }
  ];

  return (
    <div className="flex space-x-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 transition
            ${active === tab.id
              ? "bg-gray-100 text-green-700 border-t-4 border-green-700"
              : "bg-white text-gray-700 hover:bg-cyan-100"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
