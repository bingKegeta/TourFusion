import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProtectWrapper from "./components/ProtectWrapper";
import HeroPage from "./pages/HeroPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "dashboard",
    element: <ProtectWrapper child={<HomePage />} />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
