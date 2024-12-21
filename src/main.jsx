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
import HomeLayout from './Layout/HomeLayout.jsx';
import AvailableFood from './Pages/AvailableFood.jsx';
import AddFood from './Pages/AddFood.jsx';
import ManageFoods from './Pages/ManageFoods.jsx';
import MyFoodRequest from './Pages/MyFoodRequest.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomeLayout></HomeLayout>
      },
      {
        path: '/availableFood',
        element: <AvailableFood></AvailableFood>
      },
      {
        path: '/addFood',
        element: <AddFood></AddFood>
      },
      {
        path: '/manageFoods',
        element: <ManageFoods></ManageFoods>
      },
      {
        path: '/foodRequest',
        element: <MyFoodRequest></MyFoodRequest>
      },
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
