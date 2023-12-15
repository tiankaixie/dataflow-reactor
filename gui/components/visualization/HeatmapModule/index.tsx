"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  heatmapDataDemoAtom,
  heatmapDataIDAtom,
  loadHeatmapDataDemoAtom,
} from "@/lib/store"

import HeatmapCore from "./HeatmapCore"

export default function Heatmap() {
  const [data] = useAtom(heatmapDataDemoAtom)
  const [, fetchData] = useAtom(loadHeatmapDataDemoAtom)
  const [heatmapDataID] = useAtom(heatmapDataIDAtom)

  useEffect(() => {
    fetchData(heatmapDataID)
  }, [fetchData, heatmapDataID])

  if (data) {
    return (
      <div>
        <HeatmapCore data={data} />
      </div>
    )
  }

  return <div>Empty</div>
}
