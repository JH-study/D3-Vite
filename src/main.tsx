import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "about",
        element: <div>about!</div>,
      },
    ],
    errorElement: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
);
