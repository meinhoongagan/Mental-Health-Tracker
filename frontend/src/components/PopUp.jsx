// Popup.jsx
import React from 'react';

const Popup = ({ report, onClose }) => {
  // Helper function to format report string
  const formatReport = (report) => {
    if (!report) return ["Unable to load report data."];

    // Split by double line breaks for paragraphs
    return report
      .split("\n\n")
      .map((section) =>
        section.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Replace **text** with strong tags for bold
      );
  };

  const formattedReport = formatReport(report);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-80 max-w-full md:w-3/4 lg:w-1/2 xl:w-1/3 shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Mental Health Report</h2>
        <div className="mb-4 text-gray-800">
          {formattedReport.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: paragraph }} // Render with HTML for bold formatting
            ></p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
