import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import * as Cesium from 'cesium';

import './index.css'
import HomePage from './HomePage.tsx';
import Some from './some.tsx';
Cesium.buildModuleUrl('./cesium/');

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/some",
    element: <Some />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
