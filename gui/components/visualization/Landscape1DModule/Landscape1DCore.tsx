"use client"

import * as React from "react"
import * as d3 from "d3"

import { Landscape1dData } from "./landscape1dTypes"

function render(
  svgRef: React.RefObject<SVGSVGElement>,
  wraperRef: React.RefObject<HTMLDivElement>,
  data: Landscape1dData
) {
  const divElement = wraperRef.current
  const width = divElement.clientWidth
  const height = divElement.clientHeight

  const margin = {
    top: 30,
    right: 30,
    bottom: 70,
    left: 30,
  }
  const h = height - margin.top - margin.bottom
  const w = width - margin.left - margin.right

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .select("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

  const points = data.points
  const loss_max = d3.max(points, (p) => d3.max(p, (d) => d[1]))
  const loss_min = d3.min(points, (p) => d3.min(p, (d) => d[1]))
  const x_max = d3.max(points, (p) => d3.max(p, (d) => d[0]))
  const x_min = d3.min(points, (p) => d3.min(p, (d) => d[0]))
  console.log(loss_max, loss_min, x_max, x_min)

  const xScale = d3.scaleLinear().domain([x_min, x_max]).range([margin.left, w])

  const yScale = d3
    .scaleLinear()
    .domain([loss_min + 0.00000001, loss_max])
    .range([height - margin.bottom, margin.top])

  const line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  // draw rectangle background
  svg
    .selectAll("rect")
    .data([1])
    .join("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", w - margin.right)
    .attr("height", h)
    .attr("stroke", "#6D8387")
    .attr("fill", "#6D8387")
    .attr("opacity", 1.0)

  svg
    .selectAll(".line")
    .data(points)
    .join("path")
    .attr("class", "line")
    .attr("d", (d) => line(d))
    //.attr("stroke", "rgba(78,103,207,1)")
    //.attr("fill", "steelblue")
    //.attr("opacity", 0.5)
    .attr("stroke", "#ccc")
    .attr("fill", "white")
    .attr("opacity", 1)
    .attr("stroke-width", "0.5")

  // svg
  //   .selectAll("circle")
  //   .data(bfsTraversal)
  //   .join("circle")
  //   .attr("fill", (d) => {
  //     if (d.type === "main") {
  //       return "#666";
  //     } else {
  //       return "#666";
  //     }
  //   })
  //   .attr("stroke", "#666")
  //   .attr("cx", (d) => xScale(d.layoutX))
  //   .attr("cy", (d) => yScale(d.loss))
  //   .attr("r", 1);

  // svg
  //   .selectAll("text")
  //   .data(bfsTraversal)
  //   .join("text")
  //   .attr("fill", (d) => {
  //     if (d.type === "main") {
  //       return "black";
  //     } else {
  //       return "black";
  //     }
  //   })
  //   .attr("x", (d) => xScale(d.layoutX) - 5)
  //   .attr("y", (d) => yScale(d.loss) + 15)
  //   .text((d) => d.id)
  //   .attr("font-size", 10);

  // Add the x-axis.
  svg
    .selectAll(".xAxis")
    .data([data])
    .join("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))

  // Add the y-axis.
  svg
    .selectAll(".yAxis")
    .data([data])
    .join("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))

  svg
    .selectAll(".yLabel")
    .data([data.yName])
    .join("text")
    .attr("x", 15)
    .attr("y", 15)
    .attr("text-anchor", "start")
    .text("Loss")

  svg
    .selectAll(".xAxis .tick text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em") // Adjust position to fit your design
    .attr("dy", ".15em") // Adjust position to fit your design
    .attr("transform", "rotate(-45)") // Rotate the text to 45 degrees
}

interface Landscape1dCoreProps {
  data: Landscape1dData
}

export default function HeatmapCore({
  data,
}: Landscape1dCoreProps): React.JSX.Element {
  const svg = React.useRef<SVGSVGElement>(null)
  const wraperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateChart = () => {
      const divElement = wraperRef.current
      const width = divElement?.clientWidth
      const height = divElement?.clientHeight

      const svgE = d3.select(svg.current)
      if (!width || !height) return
      svgE.attr("width", width).attr("height", height)
    }

    updateChart()
    window.addEventListener("resize", updateChart)

    return () => {
      window.removeEventListener("resize", updateChart)
    }
  }, [])

  React.useEffect(() => {
    if (!data) return
    render(svg, wraperRef, data)
  }, [data])

  return (
    <div ref={wraperRef} className="h-full w-full">
      <svg ref={svg}>
        <g></g>
      </svg>
    </div>
  )
}
