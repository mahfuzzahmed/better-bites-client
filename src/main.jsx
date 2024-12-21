import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider.jsx';
import MainLayout from "./Layout/MainLayout.jsx"
import AuthLayout from "./Layout/AuthLayout.jsx"
import Login from "./Pages/Login.jsx"
import Register from "./Pages/Register.jsx"
import ErrorPage from './Pages/ErrorPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout> ,
    children:[
      {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>
          },
          {
            path: "/auth/register",
            element: <Register></Register>
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
