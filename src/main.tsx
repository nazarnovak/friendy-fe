// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "src/Root.tsx";
import ErrorPage from "src/ErrorPage.tsx";
import Intro from "src/routes/Intro.tsx";
import Getter from "src/routes/Getter.tsx";
import Poster from "src/routes/Poster.tsx";
// import Event from "src/routes/Event.tsx";
// import Payment from "src/routes/Payment.tsx";

import "src/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/intro",
    element: <Intro />,
  },
  {
    path: "/get/:id",
    element: <Getter />,
  },
  {
    path: "/post/:id",
    element: <Poster />,
  },
  //   {
  //     path: "/event",
  //     element: <Event />,
  //   },
  //   {
  //     path: "/pay",
  //     element: <Payment />,
  //   },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Turning off StrictMode so it doesn't duplicate output
  //   <React.StrictMode>
  <RouterProvider router={router} />
  //   </React.StrictMode>
);
