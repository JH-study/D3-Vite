import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { BarChartConfig } from "../utils/chartConfig";

const BarChart = ({ data }: any) => {
  const ref = useRef(null);

  useEffect(() => {
    const barChartConfig = new BarChartConfig(select(ref.current));

    barChartConfig.setWidth();
    barChartConfig.setHeight();
    barChartConfig.setXScale();
    barChartConfig.setYScale();
    barChartConfig.setXAxis();
    barChartConfig.setYAxis();

    barChartConfig.setBars();
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
