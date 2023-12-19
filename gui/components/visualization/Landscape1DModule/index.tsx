"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  heatmapDataDemoAtom,
  heatmapDataIDAtom,
  landscape1dDataDemoAtom,
  landscape1dDataIDAtom,
  loadHeatmapDataDemoAtom,
  loadLandscape1dDataDemoAtom,
} from "@/lib/store"

import Landscape1DCore from "./Landscape1DCore"

export default function Landscape1D() {
  const [data] = useAtom(landscape1dDataDemoAtom)
  const [, fetchData] = useAtom(loadLandscape1dDataDemoAtom)
  const [landscape1dDataID] = useAtom(landscape1dDataIDAtom)

  useEffect(() => {
    fetchData()
  }, [fetchData, landscape1dDataID])

  if (data) {
    return <Landscape1DCore data={data} />
  }

  return <div>Empty</div>
}
