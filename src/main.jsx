import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { MovieProvider } from './context/MovieContext' // Import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    {/* Wrap MovieProvider inside ThemeProvider (or vice versa, doesn't matter) */}
    <MovieProvider>
      <App />
    </MovieProvider>
  </ThemeProvider>
)