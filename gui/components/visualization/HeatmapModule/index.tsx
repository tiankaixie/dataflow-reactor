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
    console.log("data!!!!!!!!!!!!!@#!@#!@#!#!@#!@#")
    console.log(data)
    return <HeatmapCore data={data} />
  }

  return <div>Empty</div>
}
