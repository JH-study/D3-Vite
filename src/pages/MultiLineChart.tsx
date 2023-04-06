import { Header } from "@/components/layout";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import {
  select,
  range,
  scaleLinear,
  scaleUtc,
  max,
  axisBottom,
  axisLeft,
  line,
  curveLinear,
  min,
} from "d3";
import * as d3 from "d3";
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

  console.log(MULTI_LINE_CHART_DATA);

  useEffect(() => {
    const svg = select(svgRef.current!);

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
      .setLine();

    // const l = line()
    //   .curve(curveLinear)
    //   .x((arr) => xScale(x[arr[0]]))
    //   .y((arr) => yScale(y[arr[1]]));

    // svg
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("viewBox", [0, 0, width, height])
    //   .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    //   .style("-webkit-tap-highlight-color", "transparent")
    //   .on("pointerenter", () => {
    //     path.style("mix-blend-mode", null).style("stroke", "#ddd");
    //     dot.attr("display", null);
    //   })
    //   .on("pointermove", (event) => {
    //     const [xm, ym] = d3.pointer(event);
    //     const i = d3.least(r, (i) =>
    //       Math.hypot(xScale(x[i]) - xm, yScale(y[i]) - ym)
    //     ); // closest point
    //     if (!!i && i > -1) {
    //       path
    //         .style("stroke", ([zIdx]) => (z[i] === zIdx ? null : "#ddd"))
    //         .filter(([zIdx]) => z[i] === zIdx)
    //         .raise();
    //       dot.attr("transform", `translate(${xScale(x[i])},${yScale(y[i])})`);
    //       dot.select("text").text(z[i]);
    //     }
    //   })
    //   .on("pointerleave", () => {
    //     path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
    //     dot.attr("display", "none");
    //   })
    //   .on("touchstart", (event) => event.preventDefault());

    // svg
    //   .append("g")
    //   .attr("transform", `translate(0,${height - marginBottom})`)
    //   .call(xAxis);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(${marginLeft},0)`)
    //   .call(yAxis)
    //   .call((g) => g.select(".domain").remove())
    //   .call((g) =>
    //     g
    //       .selectAll(".tick line")
    //       .clone()
    //       .attr("x2", width - marginLeft - marginRight)
    //       .attr("stroke-opacity", 0.1)
    //   )
    //   .call((g) =>
    //     g
    //       .append("text")
    //       .attr("x", -marginLeft)
    //       .attr("y", 10)
    //       .attr("fill", "currentColor")
    //       .attr("text-anchor", "start")
    //       .text(yLabel)
    //   );

    // const dot = svg.append("g").attr("display", "none");
    // dot.append("circle").attr("r", 2.5);
    // dot
    //   .append("text")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("text-anchor", "middle")
    //   .attr("y", -8);
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
