import React from "react";
import ReactDOM from "react-dom/client";
import Overview from "./pages/Overview.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrieZesNegen from "./pages/DrieZesNegen.tsx";
import Puzzel from "./pages/Puzzel.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Overview />,
  },
  {
    path: "/369",
    element: <DrieZesNegen />,
  },
  {
    path: "/puzzel",
    element: <Puzzel />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
