import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

import { LoginProvider } from './Context/LoginContext'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
)
