import React, { useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { exportToExcel } from './utils/excelUtils'; 
import axios from "axios";

function App() {
  const [nameFilter, setNameFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');


const [issues, setIssues] = useState([]);

useEffect(() => {
  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:3000/issues');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchIssues();
}, [nameFilter, monthFilter, yearFilter]);

const handleExportToExcel = () => {
  exportToExcel(issues);
};


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Tasks
          </h2>
          <button
            onClick={handleExportToExcel}
            className="bg-custom-blue  text-white font-bold py-2 px-4 rounded"
          >
            Excel
          </button>
        </div>
        <Table tasks={issues} />
      </div>
    </div>
  );
}

export default App;
