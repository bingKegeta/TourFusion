import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import LoginRegister from './pages/LoginRegister'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/login" Component={LoginRegister}/>
      <Route path="/" Component={App}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
