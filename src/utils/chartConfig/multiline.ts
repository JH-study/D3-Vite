import { IPlainData } from "@/types";
import { curveLinear, group, line, pointer, range, least } from "d3";
import dayjs from "dayjs";
import BaseChartConfig from "./base";

export class MultiLineChartConfig extends BaseChartConfig {
  constructor(svg: SVGElement, data: IPlainData[], styleValues: any) {
    super(svg, data, styleValues);

    this.X = data.map((d) => dayjs(d.x).unix() * 1000);
  }
  setLine() {
    const l = line().curve(curveLinear);

    const path = this.svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", this.styleValues.line.color)
      .attr("stroke-width", this.styleValues.line.strokeWidth)
      .attr("stroke-linecap", this.styleValues.line.strokeLinecap)
      .attr("stroke-linejoin", this.styleValues.line.strokeLinejoin)
      .attr("stroke-opacity", this.styleValues.line.strokeOpacity)
      .selectAll("path")
      .data(group(this.R, (i: number) => this.Z[i]))
      .join("path")
      .style("mix-blend-mode", this.styleValues.mixBlendMode)
      .attr("d", (d: any) =>
        l(
          d[1].map((i: number) => [
            this.xScale(this.X[i]),
            this.yScale(this.Y[i]),
          ])
        )
      );

    return path;
  }
  setDot() {
    const dot = this.svg.append("g").attr("display", "none");

    dot.append("circle").attr("r", 2.5);
    dot
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

    return dot;
  }

  setMultiLine() {
    const path = this.setLine();
    const dot = this.setDot();

    this.svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("pointerenter", () => {
        path.style("mix-blend-mode", null).style("stroke", "#ddd");
        dot.attr("display", null);
      })
      .on("pointermove", (event: PointerEvent) => {
        const [xm, ym] = pointer(event);
        const i = least(this.R, (i: number) =>
          Math.hypot(this.xScale(this.X[i]) - xm, this.yScale(this.Y[i]) - ym)
        ); // closest point
        if (!!i && i > -1) {
          path
            .style("stroke", ([zIdx]: any) =>
              this.Z[i] === zIdx ? null : "#ddd"
            )
            .filter(([zIdx]: any) => this.Z[i] === zIdx)
            .raise();
          dot.attr(
            "transform",
            `translate(${this.xScale(this.X[i])},${this.yScale(this.Y[i])})`
          );
          dot.select("text").text(this.Z[i]);
        }
      })
      .on("pointerleave", () => {
        path
          .style("mix-blend-mode", this.styleValues.mixBlendMode)
          .style("stroke", null);
        dot.attr("display", "none");
      })
      .on("touchstart", (event: PointerEvent) => event.preventDefault());
  }
}
