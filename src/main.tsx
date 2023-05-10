import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { BarChart } from "./pages/BarChart";
import { BAR_CHART_DATA, LINE_CHART_DATA } from "@/utils/sample";
import { LineChart } from "./pages/LineChart";
import { MultiLineChart } from "./pages/MultiLineChart";
import { CandleChart } from "./pages/CandleChart";
import { AnimationLineChart } from "./pages/AnimationLineChart";
import Zooming from "./pages/Zooming";
import { AnimationBarChart } from "./pages/AnimationBarChart";

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
          element: <LineChart data={LINE_CHART_DATA} />,
        },
        {
          path: "/multi-line-chart",
          element: <MultiLineChart />,
        },
        {
          path: "/candle-chart",
          element: <CandleChart />,
        },
        {
          path: "/animation-line-chart",
          element: <AnimationLineChart />,
        },
        {
          path: "/animation-bar-chart",
          element: <AnimationBarChart />,
        },
        {
          path: "/zooming",
          element: <Zooming />,
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
