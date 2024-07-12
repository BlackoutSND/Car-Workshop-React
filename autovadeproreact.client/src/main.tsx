import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.tsx'
import './Components/index.css'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
