import { Header } from "@/components/layout";
import { useNavigate } from "react-router-dom";
import LineChart from "@/assets/lineChart.png";
import MultiLineChart from "@/assets/multiLineChart.png";
import CandleChart from "@/assets/candleChart.png";
import AnimationLineChart from "@/assets/animationLineChart.png";
import Zooming from "@/assets/zooming.png";

export const Home = () => {
  const navigate = useNavigate();
  const routeInfo = [
    {
      category: "Chart",
      desc: "",
      routes: [
        {
          src: LineChart,
          title: "Line Chart",
          path: "/line-chart",
        },
        {
          src: "",
          title: "Bar Chart",
          path: "/bar-chart",
        },
        {
          src: MultiLineChart,
          title: "Multi Line Chart",
          path: "/multi-line-chart",
        },
        {
          src: CandleChart,
          title: "Candle Chart",
          path: "/candle-chart",
        },
        {
          src: AnimationLineChart,
          title: "Animation Line Chart",
          path: "/animation-line-chart",
        },
        {
          src: Zooming,
          title: "Zooming",
          path: "/zooming",
        },
      ],
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div style={{ width: 1024 }}>
          {routeInfo.map((epic, idx) => (
            <div key={idx} className="mt-5">
              <div className="text-2xl font-black">{epic.category}</div>
              <div>{epic.desc}</div>
              <div className="mt-5 flex flex-wrap w-full gap-3">
                {epic.routes.map((route, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col justify-center items-center gap-1"
                    >
                      <div
                        className="w-48 h-32 rounded border border-slate-400 overflow-hidden cursor-pointer"
                        onClick={() => navigate(route.path)}
                      >
                        <img src={route.src} alt="" />
                      </div>
                      <span
                        className="text-sm cursor-pointer"
                        onClick={() => navigate(route.path)}
                      >
                        {route.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
