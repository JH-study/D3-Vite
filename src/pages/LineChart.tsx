import { useEffect, useRef } from "react";
import { Header } from "@/components/layout";
import { IData } from "@/types";
import { LineChartConfig } from "@/utils/chartConfig/line";
import { SCALE_TYPES } from "@/constants";

const LINE_CHART_CONFIG_STYLE_VALUES = {
  margin: {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40,
  },
  width: 640,
  height: 500,
  line: {
    color: "steelblue",
    strokeWidth: 1.5,
    strokeOpacity: 1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
};

export const LineChart = ({ data }: { data: IData[] }) => {
  const ref = useRef(null);

  useEffect(() => {
    const lineChartConfig = new LineChartConfig(
      ref.current!,
      data,
      LINE_CHART_CONFIG_STYLE_VALUES
    );
    lineChartConfig
      .setWidth()
      .setHeight()
      .setXScale({
        type: SCALE_TYPES.UTC,
      })
      .setYScale({
        type: SCALE_TYPES.LINEAR,
      })
      .setXAxis()
      .setYAxis()
      .setLine();
  }, [data]);

  return (
    <div>
      <Header />
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <svg ref={ref} />
      </div>
    </div>
  );
};
