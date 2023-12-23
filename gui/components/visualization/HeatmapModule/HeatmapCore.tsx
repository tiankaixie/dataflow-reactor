"use client"

import * as React from "react"
import * as d3 from "d3"

import { HeatmapData } from "./heatmapTypes"

function render(
  svgRef: React.RefObject<SVGSVGElement>,
  wraperRef: React.RefObject<HTMLDivElement>,
  data: HeatmapData,
  onClickHandler: any
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

  const xScale = d3.scaleBand().range([0, w]).domain(data.xLabels)

  const yScale = d3
    .scaleBand()
    .domain(data.yLabels)
    .range([xScale.bandwidth() * data.yLabels.length, 0])

  const cells = svg.selectAll(".cell").data(data.data)

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

  cells
    .join("rect")
    .attr("class", "cell")
    .attr("x", (_d, i) => xScale(data.xLabels[i % data.xLabels.length]))
    .attr("y", (_d, i) =>
      yScale(data.yLabels[Math.floor(i / data.xLabels.length)])
    )
    .attr("width", xScale.bandwidth())
    .attr("height", xScale.bandwidth())
    .style("fill", (d) => color(d))
    .on("mouseover", function (event, d) {
      d3.select(this).style("stroke", "#666").style("stroke-width", "2px")
      d3.select(this).style("cursor", "pointer")
      d3.select(this).style("stroke-opacity", 1)
      d3.select(this).style("stroke-dasharray", "5,5")
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("stroke", "none")
      d3.select(this).style("stroke-opacity", 0)
      d3.select(this).style("stroke-dasharray", "none")
    })
    .on("click", function (event, d) {
      console.log(data.xName)
      console.log(data.yName)
      console.log(data.xLabels[d.rowID], data.yLabels[d.colID], d.value)
      // const selectedCell =
      //   "high_dim3_hessian_resnet18_loss_landscape_cifar10_subset_01_bs_" +
      //   data.yLabels[d.colID] +
      //   "_seed_4_type_best_width_" +
      //   data.xLabels[d.rowID] +
      //   "_UnstructuredGrid_aknn_PersistenceThreshold_0.0_ThresholdIsAbsolute_0"
      // console.log(selectedCell)
      const selectedCell = data.yLabels[d.colID] + "_" + data.xLabels[d.rowID]
      onClickHandler(selectedCell)
    })

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
    .text("Value")
}

interface HeatmapCoreProps {
  data: HeatmapData
  onClickHandler: any
}

export default function HeatmapCore({
  data,
  onClickHandler,
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
    render(svg, wraperRef, data, onClickHandler)
  }, [data, onClickHandler])

  return (
    <div ref={wraperRef} className="h-full w-full">
      <svg ref={svg}>
        <g></g>
      </svg>
    </div>
  )
}
