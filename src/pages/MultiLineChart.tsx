import { Header } from "@/components/layout";
import { useEffect, useRef } from "react";
import { MULTI_LINE_CHART_DATA } from "@/utils/sample/multilinedata";
import { MultiLineChartConfig } from "@/utils/chartConfig/multiline";
import { SCALE_TYPES } from "@/constants";

const LINE_CHART_CONFIG_STYLE_VALUES = {
  margin: {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40,
  },
  width: 1152,
  height: 500,
  line: {
    color: "steelblue",
    strokeWidth: 1.5,
    strokeOpacity: 1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  yLabel: "↑ Unemployment (%)",
  mixBlendMode: "multiply",
};

export const MultiLineChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const multiLineChartConfig = new MultiLineChartConfig(
      svgRef.current!,
      MULTI_LINE_CHART_DATA,
      LINE_CHART_CONFIG_STYLE_VALUES
    );

    multiLineChartConfig
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
      .setMultiLine();
  }, []);

  return (
    <div>
      <Header />
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <svg ref={svgRef} />
      </div>
    </div>
  );
};
