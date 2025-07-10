import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import Tabs from './components/Tabs';
import DataTable from './components/DataTable';
import Titlebar from './components/Titlebar';

const allOrders = [
  {
    jobRequest: 'Launch social media campaign for product launch',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophie Chaudhry',
    priority: 'Medium',
    dueDate: '20-11-2024',
    estValue: '6,200,000 ₹'
  },
  {
    jobRequest: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: '3,500,000 ₹'
  },
  {
    jobRequest: 'Finalize user testing feedback for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    estValue: '4,750,000 ₹'
  },
  {
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    estValue: '5,900,000 ₹'
  },
  {
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    estValue: '2,800,000 ₹'
  }
];

function convertToGridMap(dataArray) {
  const columnHeaders = [
  { key: "jobRequest", label: "📝 Job Request", width: "w-64", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { key: "submitted", label: "📅 Submitted", width: "w-32", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { key: "status", label: "⚙️ Status", width: "w-32", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { key: "submitter", label: "🙋 Submitter", width: "w-32", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { key: "url", label: "🔗 URL", width: "w-32", bgColor: "bg-gray-100", textColor: "text-gray-700" },
  { key: "assigned", label: "👤 Assigned", width: "w-32", bgColor: "bg-green-50", textColor: "text-gray-700" },
  { key: "priority", label: "📶 Priority", width: "w-24", bgColor: "bg-purple-50", textColor: "text-gray-700" },
  { key: "dueDate", label: "🕒 Due Date", width: "w-32", bgColor: "bg-purple-50", textColor: "text-gray-700" },
  { key: "estValue", label: "💰 Est. Value", width: "w-32", bgColor: "bg-orange-50", textColor: "text-gray-700" },
  { key: "empty", label: "", width: "w-16", bgColor: "bg-white", textColor: "text-gray-700" }
];


  // Define super headers (grouped headers that span multiple columns)
  const superHeaders = [
  { label: '📊 Q3 Financial Review', colspan: 4, startCol: 0, class: "bg-gray-200" },
  { label: "", colspan: 1, startCol: 4, class: "bg-white" },
  { label: '🧠 ABC', colspan: 1, startCol: 5, class: "bg-green-100" },
  { label: '❓ Answer a question', colspan: 2, startCol: 6, class: "bg-purple-100" },
  { label: '📤 Extract', colspan: 1, startCol: 8, class: "bg-orange-100" },
  { label: '➕', colspan: 1, startCol: 9, class: "bg-gray-200" }
];


  const result = {};

  // Set column headers at row 0
  columnHeaders.forEach((col, colIndex) => {
    result[`0,${colIndex}`] = col.label;
  });

  // Set row data starting from row 1
  dataArray.forEach((obj, rowIndex) => {
    columnHeaders.forEach((col, colIndex) => {
      result[`${rowIndex + 1},${colIndex}`] = obj[col.key] ?? "";
    });
  });

  result._superHeaders = superHeaders;
  result._columnHeaders = columnHeaders;

  return result;
}

export default function App() {
  const [tab, setTab] = useState('All Orders');
  const [file, setFile] = useState('Spreadsheet 3');

  const getTabStatusMapping = (tabId) => {
    switch (tabId) {
      case 'All Orders':
        return null;
      case 'Pending':
        return ['In-process', 'Need to start'];
      case 'Reviewed':
        return ['Complete'];
      case 'Arrived':
        return ['Blocked'];
      default:
        return null;
    }
  };

  const visibleOrders = allOrders.filter(order => {
    const statusMapping = getTabStatusMapping(tab);
    return statusMapping ? statusMapping.includes(order.status) : true;
  });

  const initGrid = convertToGridMap(visibleOrders);
  const [gridData, setGridData] = useState(initGrid);

  React.useEffect(() => {
    const filtered = allOrders.filter(order => {
      const statusMapping = getTabStatusMapping(tab);
      return statusMapping ? statusMapping.includes(order.status) : true;
    });
    setGridData(convertToGridMap(filtered));
  }, [tab]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Titlebar active={file} onTabChange={setFile}/>
      <Toolbar />
      <div className="flex-1 overflow-hidden">
        <DataTable data={gridData} setData={setGridData} />
      </div>
      <Tabs active={tab} onTabChange={setTab} />
    </div>
  );
}