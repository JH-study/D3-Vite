import { Header } from "@/components/layout";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const routeInfo = [
    {
      category: "Chart",
      desc: "",
      routes: [
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
      ],
    },
    {
      category: "Chart",
      desc: "",
      routes: [
        {
          img: "",
          title: "Linear Chart",
          path: "about",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
        },
        {
          img: "",
          title: "Linear Chart",
          path: "linear",
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
                {epic.routes.map((r, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col justify-center items-center gap-1"
                    >
                      <div
                        className="w-48 h-32 rounded border border-slate-400 overflow-hidden cursor-pointer"
                        onClick={() => navigate(r.path)}
                      ></div>
                      <span
                        className="text-sm cursor-pointer"
                        onClick={() => navigate(r.path)}
                      >
                        {r.title}
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
