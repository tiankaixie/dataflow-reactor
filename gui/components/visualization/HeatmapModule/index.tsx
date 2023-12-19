"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  heatmapDataDemoAtom,
  heatmapDataIDAtom,
  landscape1dDataIDAtom,
  loadHeatmapDataDemoAtom,
} from "@/lib/store"

import HeatmapCore from "./HeatmapCore"

export default function Heatmap() {
  const [data] = useAtom(heatmapDataDemoAtom)
  const [, fetchData] = useAtom(loadHeatmapDataDemoAtom)
  const [heatmapDataID] = useAtom(heatmapDataIDAtom)
  const [, setLandscape1DDataID] = useAtom(landscape1dDataIDAtom)

  useEffect(() => {
    fetchData(heatmapDataID)
  }, [fetchData, heatmapDataID])

  if (data) {
    return <HeatmapCore data={data} onClickHandler={setLandscape1DDataID} />
  }

  return <div>Empty</div>
}
