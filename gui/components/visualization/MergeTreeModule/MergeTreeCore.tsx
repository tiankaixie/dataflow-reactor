"use client"

import * as React from "react"
import * as d3 from "d3"

import {
  LossLandscape,
  MergeTreeData,
  PersistenceBarcode,
} from "@/types/losslens"
import { mergeTreeColor } from "@/styles/vis-color-scheme"

interface MergeTreeCoreProp {
  data: MergeTreeData
  height: number
  width: number
}

function render(
  svgRef: React.RefObject<SVGSVGElement>,
  data: MergeTreeData,
  width: number,
  height: number
) {
  const margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  }
  const h = height - margin.top - margin.bottom
  const w = width - margin.left - margin.right
  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .select("g")
    .attr("id", data.id)
    .attr("transform", `translate(${margin.left},${margin.top})`)

  /**
   * Scales, dynamically based on data.
   */

  const nodes = data.nodes
  const edges = data.edges

  const xMin = d3.min(edges, (d) => Math.min(d.sourceX, d.targetX))
  const xMax = d3.max(edges, (d) => Math.max(d.sourceX, d.targetX))
  const yMin = d3.min(edges, (d) => Math.min(d.sourceY, d.targetY))
  const yMax = d3.max(edges, (d) => Math.max(d.sourceY, d.targetY))

  const xScale = d3
    .scaleLinear()
    .range([0, w])
    .domain(d3.extent([xMin, xMax]))

  let zoom = d3.zoom().on("zoom", handleZoom)

  function handleZoom(e) {
    svg.attr("transform", e.transform)
  }

  d3.select(svgRef.current).call(zoom)

  const yScale = d3
    .scaleLinear()
    .range([h, 0])
    .domain(d3.extent([yMin, yMax]))

  svg
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("class", data.id)
    .attr("x1", (d) => xScale(d.sourceX))
    .attr("y1", (d) => yScale(d.sourceY))
    .attr("x2", (d) => xScale(d.targetX))
    .attr("y2", (d) => yScale(d.targetY))
    .attr("stroke", mergeTreeColor.strokeColor)
    .attr("stroke-width", 1)
  // .attr('opacity', 0.5)

  // svg
  //   .selectAll('circle')
  //   .data(nodes)
  //   .join('circle')
  //   .attr('cx', (d) => xScale(d.x))
  //   .attr('cy', (d) => yScale(d.y))
  //   .attr('r', 3)
  //   .attr('fill', '#666')
  //   .attr('stroke', 'black')
  //   .attr('stroke-width', 1)
  //   .attr('opacity', 1)
  //
  svg
    .selectAll(".figure-label")
    .data([1])
    .join("text")
    .attr("class", "figure-label font-serif")
    .attr("x", 0)
    .attr("y", -45)
    .attr("font-size", "1rem")
    .attr("font-weight", "semi-bold")
    .attr("text-anchor", "start")
    .attr("fill", "#000")
    .text("Merge Tree [" + data.modeId + "]")
}

export default function MergeTreeCore({
  width,
  height,
  data,
}: MergeTreeCoreProp): React.JSX.Element {
  const svg = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (!data) return
    const clonedData = JSON.parse(JSON.stringify(data))
    render(svg, clonedData, width, height)
  }, [data, width, height])

  return (
    <svg ref={svg}>
      <g></g>
      {/* <g className="zoom-container"> */}
      {/*   <g className="links"></g> */}
      {/*   <g className="nodes"></g> */}
      {/* </g> */}
    </svg>
  )
}
