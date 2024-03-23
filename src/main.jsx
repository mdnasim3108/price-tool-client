import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Auth from "./components/authentication/Auth.jsx";
import Home from "./components/home/Home.jsx";
import ListEnquiry from "./components/listEnquiry/ListEnquiry.jsx";
import Provider from "./globalContextStore/Provider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CreateEnquiry from "./components/createEnquiry/CreateEnquiry.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home /> 
      </PrivateRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <PrivateRoute>
        <CreateEnquiry />
      </PrivateRoute>
    ),
  },
  {
    path: "/list",
    element: (
      <PrivateRoute>
        <ListEnquiry />
      </PrivateRoute>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
