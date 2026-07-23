import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Login from './Pages/Login/Login.jsx'
import Agriculture from './Pages/Agriculture/Agriculture.jsx'
import Construction from './Pages/Construction/Construction.jsx'
import Emergency from './Pages/Emergency/Emergency.jsx'
import HeavyLoad from './Pages/HeavyLoad/HeavyLoad.jsx'
import LightLoad from './Pages/LightLoad/LightLoad.jsx'
import RentalCars from './Pages/RentalCars/RentalCars.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Trip from './Pages/Trip/Trip.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"signup",
        element:<Signup />
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"agriculture",
        element:<Agriculture />
      },
      {
        path:"construction",
        element:<Construction />
      },
      {
        path:"emergency",
        element:<Emergency />
      },
      {
        path:"heavyload",
        element:<HeavyLoad />
      },
      {
        path:"lightload",
        element:<LightLoad />
      },
      {
        path:"rentalcars",
        element:<RentalCars />
      },
      {
        path:"trip",
        element:<Trip />
      },
      {
        path:"dashboard",
        element:<Dashboard />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
