import { Header } from "@/components/layout";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import {
  select,
  range,
  scaleLinear,
  max,
  axisBottom,
  min,
  utcDays,
  scaleBand,
  utcFormat,
} from "d3";
import { data } from "@/utils/sample/candledata";
import * as d3 from "d3";

export const CandleChart = () => {
  const svgRef = useRef(null);
  const width = 1152;
  const height = 500;

  const marginTop = 20;
  const marginBottom = 30;
  const marginRight = 30;
  const marginLeft = 40;

  const color = "steelblue";
  const strokeLinecap = "round";

  const xPadding = 0.2;
  const colors = ["#4daf4a", "#999999", "#e41a1c"];

  useEffect(() => {
    const svg = select(svgRef.current);

    const x = data.map((d) => new Date(d.Date));
    const yo = data.map((d) => d.Open);
    const yc = data.map((d) => d.Close);
    const yh = data.map((d) => d.High);
    const yl = data.map((d) => d.Low);
    const r = range(data.length);

    const weekdays = (start: Date, end: Date) =>
      utcDays(start, end).filter(
        (d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6
      );

    const xDomain = weekdays(min(x)!, dayjs(max(x!)).add(1, "d").toDate());
    const yDomain = [min(yl)!, max(yh)!];

    const xScale = scaleBand(xDomain, [
      marginLeft,
      width - marginRight,
    ]).padding(xPadding);
    const yScale = scaleLinear(yDomain, [height - marginBottom, marginTop]);

    const xAxis = axisBottom(xScale)
      .tickFormat(utcFormat("%b %-d"))
      .tickValues(
        d3.utcMonday
          .every(2)
          ?.range(min(x)!, dayjs(max(x!)).add(1, "d").toDate())!
      );
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, "~f");

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.2)
          .attr("x2", width - marginLeft - marginRight)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Price ($)")
      );

    const g = svg
      .append("g")
      .attr("stroke", color)
      .attr("stroke-linecap", strokeLinecap)
      .selectAll("g")
      .data(r)
      .join("g")
      .attr("transform", (i) => `translate(${xScale(x[i])},0)`);

    g.append("line")
      .attr("y1", (i) => yScale(yl[i]))
      .attr("y2", (i) => yScale(yh[i]));

    g.append("line")
      .attr("y1", (i) => yScale(yo[i]))
      .attr("y2", (i) => yScale(yc[i]))
      .attr("stroke-width", xScale.bandwidth())
      .attr("stroke", (i) => colors[1 + Math.sign(yo[i] - yc[i])]);
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
