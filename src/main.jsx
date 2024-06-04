import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Root from "./Root/Root";
import Home from "./Components/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import JoinUs from "./Components/JoinUs";
import Login from "./Authentication/Login/Login";
import SignUp from "./Authentication/SignUp/SignUp";
import { NextUIProvider } from "@nextui-org/react";
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ManageUser from "./Dashboard/Admin/ManageUser";
import AdminRoute from "./Dashboard/Admin/AdminRoute";
import SellerRoute from "./Dashboard/Seller/SellerRoute";
import ManageMedicine from "./Dashboard/Seller/ManageMedicine";
import ManageCategory from "./Dashboard/Admin/ManageCategory";
import CategoryDetails from "./Components/CategoryDetails";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/join",
        element: <JoinUs />,
      },
      {
        path: "/categoryDetails/:category",
        element: <CategoryDetails />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/manageUser",
        element: <AdminRoute><ManageUser /></AdminRoute>,
      },
      {
        path: "/dashboard/manageMedicine",
        element: <SellerRoute><ManageMedicine /></SellerRoute>,
      },
      {
        path: "/dashboard/manageCategory",
        element: <AdminRoute><ManageCategory /></AdminRoute>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <NextUIProvider>
          <RouterProvider router={router} /> <Toaster />
        </NextUIProvider>
      </Authentication>
    </QueryClientProvider>
  </React.StrictMode>
);
