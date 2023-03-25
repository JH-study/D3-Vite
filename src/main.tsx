import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { LineChart } from "./pages/LineChart";
import { MultiLineChart } from "./pages/MultiLineChart";

const router = createBrowserRouter(
  [
    {
      path: "",
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/line-chart",
          element: <LineChart />,
        },
        {
          path: "/multi-line-chart",
          element: <MultiLineChart />,
        },
      ],
      errorElement: <Home />,
    },
  ],
  {
    basename: "/D3-Vite",
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
);
