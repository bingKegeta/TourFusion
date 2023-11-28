import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full z-50 opacity-80 justify-items-center
              absolute items-center justify-center bg-gray-900 text-white">
      {/* <div className="animate-spin rounded-full border-t-4 border-white h-16 w-16 mb-4"></div>
      <h2 className="text-lg">Loading...</h2> */}
      <img src="/loading.gif" alt="loading..." />
      <h2 className="text-lg">C'mon snowy! Let's head to the dashboard...</h2>
    </div>
  );
};

export default LoadingPage;
