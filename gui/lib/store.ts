import { atom } from "jotai"

import { HeatmapData } from "@/components/visualization/HeatmapModule/heatmapTypes"

import { fetchHeatmapData } from "./api"

/***
 *
 * HeatmapData
 *
 * */
const createHeatmapDataAtom = () => {
  const baseAtom = atom<HeatmapData | Promise<HeatmapData> | null>(null)
  const valueAtom = atom(async (get) => get(baseAtom))
  const loadAtom = atom(null, async (_get, set, heatmapID: string) => {
    const promise = fetchHeatmapData(heatmapID).then((data: HeatmapData) => {
      return data
    })
    set(baseAtom, promise)
  })
  return [valueAtom, loadAtom]
}

export const [heatmapDataDemoAtom, loadHeatmapDataDemoAtom] =
  createHeatmapDataAtom()

export const heatmapDataIDAtom = atom<string | null>("demo")
