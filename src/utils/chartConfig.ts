import * as d3 from "d3";

class ChartConfig {
  svg: HTMLOrSVGElement;

  constructor(svg: any) {
    this.svg = svg;
  }

  setWidth() {}

  setHeight() {}

  setXScale() {}

  setYScale() {}

  setXAxis() {}

  setYAxis() {}
}

export class BarChartConfig extends ChartConfig {
  constructor(svg: any) {
    super(svg);
  }

  setBars() {}
}
