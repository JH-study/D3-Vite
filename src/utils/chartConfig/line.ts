import BaseChartConfig from "./base";
import { IData } from "@/types";
import dayjs from "dayjs";
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

export class LineChartConfig extends BaseChartConfig {
  constructor(svg: SVGElement, data: IData[], styleValues: any) {
    super(svg, data, styleValues);

    this.X = data.map((d) => dayjs(d.x).unix() * 1000);
    this.R = range(this.D.length);
  }

  setLine() {
    const l = line().curve(curveLinear);
    this.svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", this.styleValues.line.color)
      .attr("stroke-width", this.styleValues.line.strokeWidth)
      .attr("stroke-linecap", this.styleValues.line.strokeLinecap)
      .attr("stroke-linejoin", this.styleValues.line.strokeLinejoin)
      .attr("stroke-opacity", this.styleValues.line.strokeOpacity)
      .attr(
        "d",
        l(
          this.R.map((i: number) => [
            this.xScale(this.X[i]),
            this.yScale(this.Y[i]),
          ])
        )
      );
  }
}
