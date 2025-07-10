import React from 'react';

export default function Toolbar() {
  const toolbarButtons = [
    { label: 'Hide fields', icon: '👁️', variant: 'secondary' },
    { label: 'Sort', icon: '↕️', variant: 'secondary' },
    { label: 'Filter', icon: '⚡', variant: 'secondary' },
    { label: 'Cell view', icon: '▦', variant: 'secondary' },
    
  ];

  const specialButtons = [
    { label: 'Import', icon: '📁', variant: 'primary' },
    { label: 'Export', icon: '📤', variant: 'primary' },
    { label: 'Share', icon: '🔗', variant: 'primary' },
    { label: 'New Action', icon: '+', variant: 'green' },
    //{//{ label: 'ABC', color: 'bg-green-100 text-green-800', variant: 'special' },
    //{// label: 'Answer a question', color: 'bg-purple-100 text-purple-800', variant: 'special' },
    //{ //label: 'Extract', color: 'bg-orange-100 text-orange-800', variant: 'special' }}
  ];

  const getButtonStyle = (button) => {
    if(button.variant==="green"){
        return "bg-green-700 hover:bg-green-800 text-white"
    }
    else if (button.variant === 'primary') {
      return 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200';
    } else if (button.variant === 'special') {
      return `${button.color} border-none hover:opacity-80`;
    } else {
      return 'bg-white hover:bg-gray-50 text-gray-700 border-none';
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-1 bg-white border-b border-gray-200">
      {/* Left side - Main toolbar buttons */}
      <div className="flex items-center space-x-2">
        <div className='hover:bg-gray-50 pr-4 py-2 pl-2 border-r border-gray-100 rounded-md'>
        <span className="">{"Toolbar "}</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-400">›</span>
        </div>
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md transition-colors ${getButtonStyle(button)}`}
            onClick={() => alert(`${button.label} was clicked!`)}
          >
            <span className="mr-1.5">{button.icon}</span>
            {button.label}
          </button>
        ))}
      </div>

      {/* Right side - Special action buttons */}
      <div className="flex items-center space-x-2">
        {specialButtons.map((button, index) => (
          <button
            key={index}
            className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md transition-colors ${getButtonStyle(button)}`}
            onClick={() => alert(`${button.label} was clicked!`)}
          >
            {button.label}
          </button>
        ))}
        
      </div>
    </div>
  );
}