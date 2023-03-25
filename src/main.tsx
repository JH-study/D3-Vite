import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { BarChart } from "./pages/BarChart";
import { BAR_CHART_DATA } from "./data";
import { LineChart } from "./pages/LineChart";

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
          path: "/bar-chart",
          element: <BarChart data={BAR_CHART_DATA} />,
        },
        {
          path: "/line-chart",
          element: <LineChart />,
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
