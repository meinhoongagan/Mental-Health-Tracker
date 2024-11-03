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
    if (!userId) {
      alert("Please authenticate to view the mental health report.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/assist/${userId}`);
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
    <div className="relative group w-1/3">
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
      
      {/* Card content */}
      <div className="relative p-8 bg-gray-900/40 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl">
        {/* Floating particles inside card */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-4 text-white/90 tracking-wide">
            Mental Health Report
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Click the button below to get your mental health report.
          </p>
          <button
            onClick={fetchReport}
            disabled={loading}
            className="relative group/button bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-lg 
                     hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
                     shadow-[0_0_20px_rgba(132,90,223,0.3)] hover:shadow-[0_0_25px_rgba(132,90,223,0.5)]"
          >
            <span className="relative z-10">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                'Get Report'
              )}
            </span>
          </button>
        </div>
      </div>

      {isOpen && <Popup report={report} onClose={togglePopup} />}
    </div>
  );
};

export default MentalHealthReportCard;