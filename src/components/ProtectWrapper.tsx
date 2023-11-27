import React from "react";
import { getSessionToken } from "../common/extras";
import { Navigate } from "react-router";

interface ProtectWrapperProps {
  child: React.ReactNode;
}

const ProtectWrapper = ({ child }: ProtectWrapperProps) => {
  // check if a user has previously logged in (using the cookie)
  const checkUserAuth = () => {
    const session_token = getSessionToken();

    return session_token !== null;
  };

  // if the user is found to be logged in, then allow to go to dashboard directly or go to landing again
  return checkUserAuth() ? child : <Navigate to="/" />;
};

export default ProtectWrapper;
