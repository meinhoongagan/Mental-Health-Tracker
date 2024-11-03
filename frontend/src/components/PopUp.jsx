import React from 'react';

const Popup = ({ report, onClose }) => {
  // Helper function to format report string
  const formatReport = (report) => {
    if (!report) return ["Unable to load report data."];
    return report
      .split("\n\n")
      .map((section) =>
        section.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      );
  };

  const formattedReport = formatReport(report);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Container */}
      <div className="relative w-80 max-w-full md:w-3/4 lg:w-1/2 xl:w-1/3 m-4 group">
        {/* Animated border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x" />

        {/* Main Content */}
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl overflow-hidden">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
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
          <div className="relative p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mental Health Report
            </h2>

            {/* Scrollable content */}
            <div className="mb-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {formattedReport.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full relative group/button bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-lg 
                       hover:from-red-600 hover:to-pink-600 transition-all duration-300 
                       shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
            >
              <span className="relative z-10">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;