import React from "react";

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90 text-white z-50 backdrop-blur-md">
      <div className="text-center backdrop-blur-md p-4 border-2 border-[#BB9AF7] rounded-2xl bg-[#1a1b26]">
        <h2 className="text-2xl mb-4">Oops! You screwed up!</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
