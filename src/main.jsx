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
import AddFood from './Pages/AddFood.jsx';
import ManageFoods from './Pages/ManageFoods.jsx';
import MyFoodRequest from './Pages/MyFoodRequest.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import AvailableFoods from './Pages/AvailableFoods.jsx';


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
        element: <AvailableFoods></AvailableFoods>
      },
      {
        path: '/addFood',
        element:  <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: '/manageFoods',
        element:  <PrivateRoute><ManageFoods></ManageFoods></PrivateRoute>
      },
      {
        path: '/foodRequest',
        element:  <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
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
