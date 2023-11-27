import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Crypto from "./Pages/Crypto"
import Trending from "./Pages/Trending";
import Saved from "./Pages/Saved";
import CryptoDetails from "./Components/CryptoDetails";

// This creates different routes on how to route to a different page in a website
const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
    children: [
      {
        path:"/",
        element: <Crypto />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path:"/trending",
        element: <Trending />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path:"/saved",
        element: <Saved />,
        children: [
          {
            path:":coinId",
            element:<CryptoDetails />
          }
        ]
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )