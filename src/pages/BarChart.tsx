import { useEffect, useRef } from "react";
import { BarChartConfig } from "@/utils/chartConfig";
import { Header } from "@/components/layout";
import { SCALE_TYPES } from "@/constants";
import { IData } from "@/types";

const BAR_CHART_CONFIG_STYLE_VALUES = {
  margin: {
    top: 10,
    right: 10,
    bottom: 40,
    left: 40,
  },
  width: 1000,
  height: 500,
  bar: {
    color:  "#af23f2"
  }
};

export const BarChart = ({ data }: { data: IData[] }) => {
  const ref = useRef(null);

  useEffect(() => {
    const barChartConfig = new BarChartConfig(
      ref.current!,
      data,
      BAR_CHART_CONFIG_STYLE_VALUES
    );

    barChartConfig
      .setWidth()
      .setHeight()
      .setXScale({
        type: SCALE_TYPES.BAND,
      })
      .setYScale({
        type: SCALE_TYPES.LINEAR,
      })
      .setXAxis()
      .setYAxis()
      .setBars();
  }, [data]);

  return (
    <>
      <Header />
      <svg ref={ref}></svg>
    </>
  );
};
