import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './fonts.css'

import { BrowserRouter } from 'react-router-dom'

import { LoginProvider } from './Context/LoginContext'

import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
        <Analytics />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
)
