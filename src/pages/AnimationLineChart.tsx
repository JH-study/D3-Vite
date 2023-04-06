import { Header } from "@/components/layout";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleUtc,
  max,
  axisBottom,
  axisLeft,
  line,
  scaleSequential,
  interpolateSpectral,
  interpolate,
  group,
  easeLinear,
} from "d3";
import { data } from "@/utils/sample/animationlinedata";

export const AnimationLineChart = () => {
  const svgRef = useRef(null);
  const width = 1152;
  const height = 720;

  const marginTop = 20;
  const marginBottom = 30;
  const marginRight = 30;
  const marginLeft = 40;

  useEffect(() => {
    const svg = select(svgRef.current!);

    const y = data.map((d) => d.value);
    const z = scaleSequential([1978, 2017], (t) => interpolateSpectral(1 - t));

    const xScale = scaleUtc(
      [Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 0)],
      [marginLeft, width - marginRight]
    );
    const yScale = scaleLinear(
      [0, max(y.filter((d) => !!d) as number[])!],
      [height - marginBottom, marginTop]
    );

    const xAxis = axisBottom(xScale)
      .ticks(width / 80, "%B")
      .tickSizeOuter(0);
    const yAxis = axisLeft(yScale).ticks(null, "s");

    const intrayear = (unix: number) => {
      return dayjs(unix).set("year", 2000).unix() * 1000;
    };

    const l = line()
      .x((d) => xScale(intrayear(d[0])))
      .y((d) => yScale(d[1]));

    function dashTween(this: any) {
      const length = this.getTotalLength();
      return interpolate(`0,${length}`, `${length},${length}`);
    }

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
          .selectAll(".tick:not(:first-of-type) line")
          .clone()
          .attr("x2", width)
          .attr("stroke", "#ddd")
      )
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("km²")
      );

    const g = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1);

    const aniamtion = async () => {
      for (const [key, values] of group(data, (d) =>
        new Date(d.date).getUTCFullYear()
      )) {
        await g
          .append("path")
          .attr(
            "d",
            l(values.map((v) => [dayjs(v.date).unix() * 1000, v.value]))
          )
          .attr("stroke", z(key))
          .attr("stroke-dasharray", "0,1")
          .transition()
          .ease(easeLinear)
          .attrTween("stroke-dasharray", dashTween)
          .end();

        if (!isNaN(values[values.length - 1].value)) {
          g.append("text")
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("dx", 4)
            .attr("dy", "0.32em")
            .attr(
              "x",
              xScale(
                intrayear(dayjs(values[values.length - 1].date).unix() * 1000)
              )
            )
            .attr("y", yScale(values[values.length - 1].value))
            .text(key)
            .clone(true)
            .attr("fill", z(key))
            .attr("stroke", "none");
        }
      }
    };

    aniamtion();
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
