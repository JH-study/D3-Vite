import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { BarChart } from "./pages/BarChart";
import { BAR_CHART_DATA } from "./data";
import { LineChart } from "./pages/LineChart";
import { MultiLineChart } from "./pages/MultiLineChart";
import { CandleChart } from "./pages/CandleChart";

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
        {
          path: "/multi-line-chart",
          element: <MultiLineChart />,
        },
        {
          path: "/candle-chart",
          element: <CandleChart />,
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
