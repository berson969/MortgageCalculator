import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MortgageCalculator from "./components/MortgageCalculator.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MortgageCalculator />
  </React.StrictMode>,
)
