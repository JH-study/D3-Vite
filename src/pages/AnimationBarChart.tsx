import { Header } from "@/components/layout";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import {
  InternMap,
  axisTop,
  descending,
  easeLinear,
  format,
  groups,
  interpolateNumber,
  pairs,
  range,
  rollup,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeTableau10,
  select,
} from "d3";

import { data } from "@/utils/sample/animationbardata";

type keyframeType = [
  number,
  {
    rank: number;
    name: string;
    value: number;
  }[]
];

export const AnimationBarChart = () => {
  const svgRef = useRef(null);
  const width = 1152;
  const duration = 250;
  const num = 12;
  const barSize = 48;

  const marginTop = 16;
  const marginBottom = 6;
  const marginRight = 6;
  const marginLeft = 0;

  useEffect(() => {
    const svg = select(svgRef.current!);

    const height = marginTop + barSize * num + marginBottom;
    const names = new Set(data.map((d) => d.name));

    const date: [number, InternMap<string, number>][] = Array.from(
      rollup(
        data,
        ([d]) => d.value,
        (d) => dayjs(d.date).unix() * 1000,
        (d) => d.name
      )
    ).map(([date, data]) => [date, data]);

    const xScale = scaleLinear([0, 1], [marginLeft, width - marginRight]);
    const yScale = scaleBand(range(num + 1), [
      marginTop,
      marginTop + barSize * (num + 1 + 0.1),
    ]).padding(0.1);

    const getRank = (a: any, b: any, t: number) => {
      const data = Array.from(names, (name) => ({
        name,
        value: (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t,
      }));
      data.sort((a, b) => descending(a.value, b.value));
      return data.map((d, idx) => ({ ...d, rank: Math.min(num, idx) }));
    };

    const getKeyframes = () => {
      const keyframes: keyframeType[] = [];
      const k = 10;
      let ka, a, kb, b;
      for ([[ka, a], [kb, b]] of pairs(date)) {
        for (let i = 0; i < k; ++i) {
          const t = i / k;
          keyframes.push([ka * (1 - t) + kb * t, getRank(a, b, t)]);
        }
      }
      keyframes.push([kb as number, getRank(a, b, 1)]);
      return keyframes;
    };

    const nameframes = groups(
      getKeyframes().flatMap(([, data]) => data),
      (d) => d.name
    );
    const prev = new Map(
      nameframes.flatMap(([, data]) => pairs(data, (a, b) => [b, a]))
    );
    const next = new Map(nameframes.flatMap(([, data]) => pairs(data)));

    const getColor = (d: any) => {
      const scale = scaleOrdinal(schemeTableau10);
      if (data.some((d) => d.category !== undefined)) {
        const categoryByName = new Map(data.map((d) => [d.name, d.category]));
        scale.domain(categoryByName.values());
        return scale(categoryByName.get(d.name)!);
      }
      return scale(d.name);
    };

    let bar: any = svg.append("g").attr("fill-opacity", 0.6).selectAll("rect");
    const updateBars = ([date, data]: keyframeType, transition: any) => {
      bar = bar
        .data(data.slice(0, num), (d: any) => d.name)
        .join(
          (enter: any) =>
            enter
              .append("rect")
              .attr("fill", getColor)
              .attr("height", yScale.bandwidth())
              .attr("x", xScale(0))
              .attr("y", (d: any) => yScale((prev.get(d) || d).rank)!)
              .attr(
                "width",
                (d: any) => xScale((prev.get(d) || d).value) - xScale(0)
              ),
          (update: any) => update,
          (exit: any) =>
            exit
              .transition(transition)
              .remove()
              .attr("y", (d: any) => yScale((next.get(d) || d).rank)!)
              .attr(
                "width",
                (d: any) => xScale((next.get(d) || d).value) - xScale(0)
              )
        )
        .call((bar: any) =>
          bar
            .transition(transition)
            .attr("y", (d: any) => yScale(d.rank)!)
            .attr("width", (d: any) => xScale(d.value) - xScale(0))
        );
    };
    const axis = axisTop(xScale)
      .ticks(width / 160)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (num * yScale.padding()));

    const g = svg.append("g").attr("transform", `translate(0, ${marginTop})`);
    const updateAxis = ([date, data]: keyframeType, transition: any) => {
      g.transition(transition)
        .call(axis)
        .select(".tick:first-of-type text")
        .remove()
        .selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "white")
        .select(".domain")
        .remove();
    };

    const formatNumber = (a: number, b: number) => {
      const f = format(",d");
      const i = interpolateNumber(a, b);
      return function (this: any, t: number) {
        this.textContent = f(i(t));
      };
    };

    let label: any = svg
      .append("g")
      .style("font", "bold 12px var(--sans-serif)")
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .selectAll("text");
    const updateLabels = ([date, data]: keyframeType, transition: any) => {
      label = label
        .data(data.slice(0, num), (d: any) => d.name)
        .join(
          (enter: any) =>
            enter
              .append("text")
              .attr(
                "transform",
                (d: any) =>
                  `translate(${xScale((prev.get(d) || d).value)},${yScale(
                    (prev.get(d) || d).rank
                  )})`
              )
              .attr("y", yScale.bandwidth() / 2)
              .attr("x", -6)
              .attr("dy", "-0.25em")
              .text((d: any) => d.name)
              .call((text: any) =>
                text
                  .append("tspan")
                  .attr("fill-opacity", 0.7)
                  .attr("font-weight", "normal")
                  .attr("x", -6)
                  .attr("dy", "1.15em")
              ),
          (update: any) => update,
          (exit: any) =>
            exit
              .transition(transition)
              .remove()
              .attr(
                "transform",
                (d: any) =>
                  `translate(${xScale((next.get(d) || d).value)},${yScale(
                    (next.get(d) || d).rank
                  )})`
              )
              .call((g: any) =>
                g
                  .select("tspan")
                  .tween("text", (d: any) =>
                    formatNumber(d.value, (next.get(d) || d).value)
                  )
              )
        )
        .call((bar: any) =>
          bar
            .transition(transition)
            .attr(
              "transform",
              (d: any) => `translate(${xScale(d.value)},${yScale(d.rank)})`
            )
            .call((g: any) =>
              g
                .select("tspan")
                .tween("text", (d: any) =>
                  formatNumber((prev.get(d) || d).value, d.value)
                )
            )
        );
    };

    const now = svg
      .append("text")
      .style("font", `bold ${barSize}px var(--sans-serif)`)
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", marginTop + barSize * (num - 0.45))
      .attr("dy", "0.32em")
      .text(dayjs(getKeyframes()[0][0]).format("YYYY"));
    const updateTickers = ([date, data]: keyframeType, transition: any) => {
      transition.end().then(() => now.text(dayjs(date).format("YYYY")));
    };

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    const aniamtion = async () => {
      for (const keyframe of getKeyframes()) {
        const transition = svg.transition().duration(duration).ease(easeLinear);
        xScale.domain([0, keyframe[1][0].value]);

        updateAxis(keyframe, transition);
        updateBars(keyframe, transition);
        updateLabels(keyframe, transition);
        updateTickers(keyframe, transition);

        await transition.end();
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
