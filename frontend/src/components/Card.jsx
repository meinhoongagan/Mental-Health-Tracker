// MentalHealthReportCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Popup from './Popup';

const MentalHealthReportCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // Access userId from Redux store
  const userId = useSelector((state) => state.loginReducer.userId);

    const fetchReport = async () => {
        // Check if userId is present
        if (!userId) {
        alert("Please authenticate to view the mental health report.");
        return;
        }
        setLoading(true);
        try {
        // Pass userId in the URL
        console.log(userId);
        
        const response = await axios.get(`http://localhost:8000/assist/${userId}`);
        console.log(response.data);
        
        setReport(response.data.report);
        setIsOpen(true);
        } catch (error) {
        console.error("Error fetching the report:", error);
        } finally {
        setLoading(false);
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg text-center">
      <h3 className="text-xl font-semibold mb-4">Mental Health Report</h3>
      <p className="text-gray-700 mb-4">
        Click the button below to get your mental health report.
      </p>
      <button
        onClick={fetchReport}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? 'Loading...' : 'Get Report'}
      </button>
      
      {isOpen && (
        <Popup report={report} onClose={togglePopup} />
      )}
    </div>
  );
};

export default MentalHealthReportCard;
