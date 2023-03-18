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
import { data } from "@/utils/sample/linedata";

export const LineChart = () => {
  const svgRef = useRef(null);
  const width = 640;
  const height = 500;

  const marginTop = 20;
  const marginBottom = 30;
  const marginRight = 30;
  const marginLeft = 40;

  const color = "steelblue";
  const strokeWidth = 1.5;
  const strokeOpacity = 1;
  const strokeLinecap = "round";
  const strokeLinejoin = "round";

  useEffect(() => {
    const svg = select(svgRef.current);

    const x = data.map((d) => dayjs(d.date).unix() * 1000);
    const y = data.map((d) => d.close);
    const r = range(data.length);

    const xScale = scaleUtc(
      [min(x)!, max(x)!],
      [marginLeft, width - marginRight]
    );
    const yScale = scaleLinear(
      [0, max(y)!],
      [height - marginBottom, marginTop]
    );

    const xAxis = axisBottom(xScale).ticks(width / 80);
    const yAxis = axisLeft(yScale).ticks(height / 40);

    const l = line().curve(curveLinear);

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("yLabel")
      );

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", l(r.map((i) => [xScale(x[i]), yScale(y[i])])));
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
