import { FC, useEffect, useRef } from "react";
import { select, interpolateRainbow, interpolateZoom, ZoomView } from "d3";

type PropType = {
  width?: number;
  height?: number;
  radius?: number;
};

const Zooming: FC<PropType> = ({
  width = window.innerWidth,
  height = window.innerHeight,
  radius = 6,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const step = radius * 2;
    const theta = Math.PI * (3 - Math.sqrt(5));

    const data = Array.from({ length: 2000 }, (_, i) => {
      const r = step * Math.sqrt((i += 0.5)),
        a = theta * i;
      return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
    });

    let currentTransform: ZoomView = [width / 2, height / 2, height];

    function transition() {
      const d = data[Math.floor(Math.random() * data.length)];
      const i = interpolateZoom(currentTransform, [
        ...d,
        radius * 2 + 1,
      ] as ZoomView);

      g.transition()
        .delay(250)
        .duration(i.duration)
        .attrTween(
          "transform",
          () => (t) => transform((currentTransform = i(t)))
        )
        .on("end", transition);
    }

    function transform([x, y, r]: number[]) {
      return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `;
    }

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", radius)
      .attr("fill", (d, i) => interpolateRainbow(i / 360));

    svg.call(transition).node();
  }, []);

  return <svg ref={svgRef} />;
};

export default Zooming;
