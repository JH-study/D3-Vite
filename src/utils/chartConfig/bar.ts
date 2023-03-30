import BaseChartConfig from "./base";
import { IData } from "@/types";

export class BarChartConfig extends BaseChartConfig {
  constructor(svg: SVGElement, data: IData[], styleValues: any) {
    super(svg, data, styleValues);
  }

  setBars() {
    const bars = this.svg
      .append("g")
      .attr("class", "bars")
      .selectAll("rect")
      .data(this.D)
      .join("rect");

    bars
      .attr("class", "bar")
      .attr("x", (d: IData) => this.xScale(d.x))
      .attr("y", (d: IData) => this.yScale(d.y))
      .attr("width", this.xScale.bandwidth())
      .attr(
        "height",
        (d: IData) =>
          this.styleValues.height -
          this.yScale(d.y) -
          this.styleValues.margin.bottom
      )
      .attr("fill", this.styleValues.bar.color);

    return this;
  }
}
