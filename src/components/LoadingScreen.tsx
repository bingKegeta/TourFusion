import React from "react";
import add_loading from "/add_loading.gif"

export default function LoadingScreen() {
    return (
        <div className="h-[100svh] w-full bg-[#1a1b26] text-2xl text-white text-center grid items-center font-sans">
          <div className="flex flex-col space-y-2 items-center p-4">
            <img src={add_loading} alt="loading" width={600} height={600} className="shadow-lg rounded-lg border-4 shadow-red-300"/>
            <span>You are making me work extra hard...</span>
            <span>Wait until we are done.</span>
          </div>
        </div>
      );
}