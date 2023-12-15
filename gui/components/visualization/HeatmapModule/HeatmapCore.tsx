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
    top: 25,
    right: 0,
    bottom: Math.abs(height - width) - 5,
    left: 20,
  }
  const h = height - margin.top - margin.bottom
  const w = width - margin.left - margin.right

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .select("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
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
