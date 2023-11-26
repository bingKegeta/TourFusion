import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="absolute flex items-center justify-center h-full bg-gray-900 text-white w-full">
      <div className="animate-spin rounded-full border-t-4 border-white h-16 w-16 mb-4"></div>
      <h2 className="text-lg">Loading...</h2>
    </div>
  );
};

export default LoadingPage;
