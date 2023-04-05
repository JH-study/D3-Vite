import { select } from "d3-selection";
import {
  map,
  scaleBand,
  scaleLinear,
  axisBottom,
  axisLeft,
  max,
  min,
  scaleUtc,
} from "d3";
import { SCALE_TYPES } from "@/constants";
import { IPlainData } from "@/types";

export default class BaseChartConfig {
  styleValues: any;
  svg: any;
  xScale: any;
  yScale: any;

  D: IPlainData[];
  X: any;
  Y: number[];
  R: any;

  constructor(svgRef: SVGElement, data: IPlainData[], styleValues: any) {
    this.styleValues = styleValues;
    this.svg = select(svgRef);

    this.D = data;
    this.X = map(this.D, (d: IPlainData) => d.x);
    this.Y = map(this.D, (d: IPlainData) => d.y);
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
    let domain;
    let range;

    switch (type) {
      case SCALE_TYPES.BAND:
        domain = this.X;
        range = [this.styleValues.margin.left, this.styleValues.width];
        this.xScale = scaleBand(domain, range).paddingInner(0.4);
        return this;

      case SCALE_TYPES.UTC:
        domain = [Number(min(this.X)), Number(max(this.X))];
        range = [
          this.styleValues.margin.left,
          this.styleValues.width - this.styleValues.margin.right,
        ];
        this.xScale = scaleUtc(domain, range);
        return this;

      default:
        return this;
    }
  }

  setYScale({ type }: { type: string }) {
    let domain;
    let range;

    switch (type) {
      case SCALE_TYPES.LINEAR:
        domain = [0, max(this.Y) as number];
        range = [
          this.styleValues.height - this.styleValues.margin.bottom,
          this.styleValues.margin.top,
        ];
        this.yScale = scaleLinear(domain, range).nice();
        return this;
      default:
        return this;
    }
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
      .call(axisBottom(this.xScale).tickSizeOuter(0));

    return this;
  }

  setYAxis() {
    const yAxis = this.svg
      .append("g")
      .attr("class", "y-axis")
      .call((g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) =>
        g.select(".domain").remove()
      )
      .call((g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) =>
        g

          .selectAll(".tick line")
          .clone()
          .attr(
            "x2",
            this.styleValues.width -
              this.styleValues.margin.left -
              this.styleValues.margin.right
          )
          .attr("stroke-opacity", 0.1)
      )
      .call((g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) =>
        g
          .append("text")
          .attr("x", -this.styleValues.margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("yLabel")
      );

    yAxis
      .attr("transform", `translate(${this.styleValues.margin.left},0)`)
      .call(axisLeft(this.yScale).ticks(10));

    return this;
  }
}
