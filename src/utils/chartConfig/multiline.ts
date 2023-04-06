import { IPlainData } from "@/types";
import { curveLinear, group, line, range } from "d3";
import dayjs from "dayjs";
import BaseChartConfig from "./base";

export class MultiLineChartConfig extends BaseChartConfig {
  constructor(svg: SVGElement, data: IPlainData[], styleValues: any) {
    super(svg, data, styleValues);

    this.X = data.map((d) => dayjs(d.x).unix() * 1000);
  }
  setLine() {
    const l = line().curve(curveLinear);

    this.svg
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
  }
}
