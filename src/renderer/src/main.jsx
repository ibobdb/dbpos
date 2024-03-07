import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { GlobalStateProvider } from "./context/globalStateContext";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </BrowserRouter>
  </React.StrictMode>
)
