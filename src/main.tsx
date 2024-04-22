import React from "react";
import ReactDOM from "react-dom/client";
import Overview from "./pages/Overview.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrieZesNegen from "./pages/DrieZesNegen.tsx";
import Puzzel from "./pages/Puzzel.tsx";
import CollectiefGeheugen from "./pages/CollectiefGeheugen.tsx";
import RouterHotkeys from "./RouterHotkeys.tsx";

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
    path: "/puzzel/:number",
    element: <Puzzel />,
  },
  {
    path: "/collectiefgeheugen/:number",
    element: <CollectiefGeheugen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterHotkeys>
      <RouterProvider router={router} />
    </RouterHotkeys>
  </React.StrictMode>
);
