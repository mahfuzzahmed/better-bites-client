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
import FoodDetails from './Pages/FoodDetails.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppDownloadSection from './Components/AppDownloadSection.jsx';


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
        path: '/getTheApp',
        element: <AppDownloadSection></AppDownloadSection>
      },
      {
        path: '/addFood',
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: '/food/:id',
        element: <PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://server-side-alpha-ecru.vercel.app/food/${params.id}`)
      },
      {
        path: '/manageFoods',
        element: <PrivateRoute><ManageFoods></ManageFoods></PrivateRoute>
      },
      {
        path: '/foodRequest',
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
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
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
