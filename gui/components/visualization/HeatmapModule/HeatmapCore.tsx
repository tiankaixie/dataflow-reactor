"use client"

import * as React from "react"
import * as d3 from "d3"

import { HeatmapData } from "./heatmapTypes"

function render(
  svgRef: React.RefObject<SVGSVGElement>,
  wraperRef: React.RefObject<HTMLDivElement>,
  data: HeatmapData
) {
  const divElement = wraperRef.current
  const width = divElement.clientWidth
  const height = divElement.clientHeight

  const margin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50,
  }
  const h = height - margin.top - margin.bottom
  const w = width - margin.left - margin.right

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .select("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

  console.log(data)
  const xScale = d3.scaleBand().range([0, w]).domain(data.yLabels)

  const yScale = d3
    .scaleBand()
    .domain(data.xLabels)
    .range([xScale.bandwidth() * data.xLabels.length, 0])

  const rows = svg.selectAll(".row").data(data.data)

  const customizedColors = [
    "#004477",
    "#305685",
    "#4d6994",
    "#677da3",
    "#8091b2",
    "#99a6c1",
    "#b2bcd0",
    "#cbd2e0",
    "#e5e8ef",
    "#ffffff",
  ]

  const lowerBound = d3.min(data.data.flat()) as number
  const upperBound = d3.max(data.data.flat()) as number

  const domainSteps = customizedColors.map((_color, i) => {
    return (
      lowerBound + (i * (upperBound - lowerBound)) / customizedColors.length
    )
  })

  const color = d3.scaleLinear().domain(domainSteps).range(customizedColors)

  rows
    .join("g")
    .attr("class", "row")
    .attr("transform", (_d, i) => `translate(0, ${yScale(data.xLabels[i])})`)

  const row = rows.selectAll(".cell").data((d) => d)

  row
    .join("rect")
    .attr("class", "cell")
    .attr("x", (_d, i) => xScale(data.yLabels[i]))
    .attr("y", 0)
    .attr("width", xScale.bandwidth())
    .attr("height", xScale.bandwidth())
    .style("fill", (d) => color(d))

  const xAxis = svg.selectAll(".xAxis").data([1])

  xAxis
    .join("g")
    .attr("class", "xAxis")
    .attr(
      "transform",
      `translate(0, ${xScale.bandwidth() * data.xLabels.length})`
    )
    .call(d3.axisBottom(xScale).tickSize(0))

  const yAxis = svg.selectAll(".yAxis").data([1])

  yAxis
    .join("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${0}, ${0})`)
    .call(d3.axisLeft(yScale).tickSize(0))

  const legend = svg.selectAll(".legend").data([1])
  let lg = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "lossgrad")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%")

  lg.selectAll("stop")
    .data(customizedColors)
    .join("stop")
    .attr("offset", (_d, i) => (i * 100) / customizedColors.length + "%")
    .style("stop-color", (d) => d)
    .style("stop-opacity", 1)

  legend
    .join("rect")
    .attr("class", "legend")
    .attr("y", xScale.bandwidth() * data.xLabels.length + 20)
    .attr("x", 40)
    .attr("height", 10)
    .attr("width", w - 40)
    .attr("stroke", "#666")
    .attr("fill", "url(#lossgrad)")

  const legendScale = d3
    .scaleLinear()
    .range([0, w - 40])
    .domain([lowerBound, upperBound])

  const legendAxis = svg.selectAll(".legendAxis").data([data])

  legendAxis
    .join("g")
    .attr("class", "legendAxis")
    .attr(
      "transform",
      `translate(40, ${xScale.bandwidth() * data.xLabels.length + 30})`
    )
    .call(d3.axisBottom(legendScale).ticks(5))

  // legendAxis.select(".domain").attr("display", "none")
  legendAxis
    .selectAll(".tick text")
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-30) translate(0, 0)")
  legendAxis.selectAll(".tick line").attr("stroke", "#666")

  legendAxis
    .selectAll(".legendLabel")
    .data([1])
    .join("text")
    .attr("class", "legendLabel")
    .attr("x", -25)
    .attr("y", 5)
    .attr("font-size", "12px")
    .attr("fill", "#666")
    .text("Number")
  //
  // // const zoom = d3
  // //   .zoom()
  // //   .on("zoom", zoomed)
  // //   .extent([
  // //     [0, 0],
  // //     [width, height],
  // //   ])
  // //   .scaleExtent([0.5, 8])
  // //
  // // svgbase.call(zoom)
  // //
  // // const zoomContainer = svgbase.select(".zoom-container")
  // //
  // // function zoomed(event) {
  // //   zoomContainer.attr("transform", event.transform)
  // // }
  //
  // svg
  //   .selectAll(".figure-label")
  //   .data([1])
  //   .join("text")
  //   .attr("class", "figure-label")
  //   .attr("x", 20)
  //   .attr("y", -10)
  //   .attr("font-size", "0.8rem")
  //   .attr("font-weight", "bold")
  //   .attr("text-anchor", "start ")
  //   .attr("fill", "#666")
  //   .text("Loss 2D HeatMap [Seed " + data.modeId + "]")
}

interface HeatmapCoreProps {
  data: HeatmapData
}

export default function HeatmapCore({
  data,
}: HeatmapCoreProps): React.JSX.Element {
  const svg = React.useRef<SVGSVGElement>(null)
  const wraperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateChart = () => {
      const divElement = wraperRef.current
      const width = divElement?.clientWidth
      const height = divElement?.clientHeight

      const svgE = d3.select(svg.current)
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
