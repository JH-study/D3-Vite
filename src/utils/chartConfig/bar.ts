import BaseChartConfig from "./base";
import { IPlainData } from "@/types";

export class BarChartConfig extends BaseChartConfig {
  constructor(svg: SVGElement, data: IPlainData[], styleValues: any) {
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
      .attr("x", (d: IPlainData) => this.xScale(d.x))
      .attr("y", (d: IPlainData) => this.yScale(d.y))
      .attr("width", this.xScale.bandwidth())
      .attr(
        "height",
        (d: IPlainData) =>
          this.styleValues.height -
          this.yScale(d.y) -
          this.styleValues.margin.bottom
      )
      .attr("fill", this.styleValues.bar.color);

    return this;
  }
}
