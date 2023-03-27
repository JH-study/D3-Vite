import { select } from "d3-selection";
import { map, scaleBand, scaleLinear, axisBottom, axisLeft, max } from "d3";
import { CHART_TYPES } from "@/constants";
import { IData } from "@/types";

class BaseChartConfig {
  styleValues: any;
  svg: any;
  xScale: any;
  yScale: any;

  D: IData[];
  X: string[];
  Y: number[];

  constructor(svgRef: SVGElement, data: IData[], styleValues: any) {
    this.styleValues = styleValues;
    this.svg = select(svgRef);

    this.D = data;
    this.X = map(this.D, (d: IData) => d.x);
    this.Y = map(this.D, (d: IData) => d.y);
  }

  setWidth() {
    this.svg.attr("width", this.styleValues.width);

    return this;
  }

  setHeight() {
    this.svg.attr("height", this.styleValues.height);

    return this;
  }

  setXScale({ type }: { type: string }) {
    if (type === CHART_TYPES.BAND) {
      const domain = this.X;
      const range = [this.styleValues.margin.left, this.styleValues.width];

      this.xScale = scaleBand(domain, range).paddingInner(0.4);
    }

    return this;
  }

  setYScale({ type }: { type: string }) {
    if (type === CHART_TYPES.LINEAR) {
      const domain = [0, max(this.Y) as number];
      const range = [
        this.styleValues.height - this.styleValues.margin.bottom,
        this.styleValues.margin.top,
      ];

      this.yScale = scaleLinear(domain, range).nice();
    }

    return this;
  }

  setXAxis() {
    const xAxis = this.svg.append("g").attr("class", "x-axis");

    xAxis
      .attr(
        "transform",
        `translate(0,${
          this.styleValues.height - this.styleValues.margin.bottom
        })`
      )
      .call(
        axisBottom(this.xScale)
          .tickSizeOuter(0)
      );

    return this;
  }

  setYAxis() {
    const yAxis = this.svg.append("g").attr("class", "y-axis");

    yAxis
      .attr("transform", `translate(${this.styleValues.margin.left},0)`)
      .call(axisLeft(this.yScale).ticks(10));

    return this;
  }
}

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
      .attr("fill", "#af23f2");

    return this;
  }
}
