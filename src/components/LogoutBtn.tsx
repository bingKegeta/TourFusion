import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function LogoutBtn() {
  const { isAuthenticated, login, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session token cookie
    document.cookie =
      "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // set the logout context here
    logout();

    // Redirect to the login page or home page
    navigate("/");
  };

  return (
    <div
      className="p-2 
                        font-sans flex 
                        items-center 
                        justify-end 
                        w-fit 
                        border-2
                        hover:bg-gradient-to-tr
                        from-[darkred] via-[#5a4a78] to-pink-500 animate-gradient-x
                        duration-100
                        ease-in-out
                        border-[#BB9AF7]
                        shadow-lg
                        bg-[#3A3535] 
                        rounded-2xl"
    >
      <button onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 stroke-white stroke-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
    </div>
  );
}
