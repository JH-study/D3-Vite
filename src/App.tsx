import BarChart from "./components/BarChart";
import { BAR_CHART_DATA } from "./data";

const App = () => {
  return (
    <div className="flex w-full h-screen">
      {/* 규현 작업 */}
      <div className="flex-1">
        <BarChart data={BAR_CHART_DATA} />
      </div>
      {/* 건호 작업 */}
      <div className="flex-1"></div>
    </div>
  );
};

export default App;
