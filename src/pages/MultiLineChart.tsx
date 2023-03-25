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
import { data } from "@/utils/sample/multilinedata";

export const MultiLineChart = () => {
  const svgRef = useRef(null);
  const width = 1152;
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

  const yLabel = "↑ Unemployment (%)";
  const mixBlendMode = "multiply";

  useEffect(() => {
    const svg = select(svgRef.current!);

    const x = data.map((d) => dayjs(d.date).unix() * 1000);
    const y = data.map((d) => d.unemployment);
    const z = data.map((d) => d.division);

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

    const l = line()
      .curve(curveLinear)
      .x((arr) => xScale(x[arr[0]]))
      .y((arr) => yScale(y[arr[1]]));

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .style("-webkit-tap-highlight-color", "transparent")
      .on("pointerenter", () => {
        path.style("mix-blend-mode", null).style("stroke", "#ddd");
        dot.attr("display", null);
      })
      .on("pointermove", (event) => {
        const [xm, ym] = d3.pointer(event);
        const i = d3.least(r, (i) =>
          Math.hypot(xScale(x[i]) - xm, yScale(y[i]) - ym)
        ); // closest point
        if (!!i && i > -1) {
          path
            .style("stroke", ([zIdx]) => (z[i] === zIdx ? null : "#ddd"))
            .filter(([zIdx]) => z[i] === zIdx)
            .raise();
          dot.attr("transform", `translate(${xScale(x[i])},${yScale(y[i])})`);
          dot.select("text").text(z[i]);
        }
      })
      .on("pointerleave", () => {
        path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
        dot.attr("display", "none");
      })
      .on("touchstart", (event) => event.preventDefault());

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
          .text(yLabel)
      );

    const path = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .selectAll("path")
      .data(d3.group(r, (i) => z[i]))
      .join("path")
      .style("mix-blend-mode", mixBlendMode)
      .attr("d", ([, arr]) => l(arr.map((n) => [n, n])));

    const dot = svg.append("g").attr("display", "none");
    dot.append("circle").attr("r", 2.5);
    dot
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);
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
