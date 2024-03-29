import { atom } from "jotai"

import { HeatmapData } from "@/components/visualization/HeatmapModule/heatmapTypes"
import { Landscape1dData } from "@/components/visualization/Landscape1DModule/landscape1dTypes"

import {
  fetchHeatmapData,
  fetchHeatmapDataIDs,
  fetchLandscape1DData,
} from "./api"

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

export const heatmapDataIDAtom = atom<string | null>(
  // "pd_scores_pinn_dim3_beta_lr_seed"
  // "mt_scores_resnet18_dim3_bs_width_seed"
  "pd_scores_resnet18_dim3_bs_width_seed"
)

const createHeatmapDataIDsAtom = () => {
  const baseAtom = atom<string[] | Promise<String[]> | null>(null)
  const valueAtom = atom((get) => get(baseAtom))
  const loadAtom = atom(null, async (_get, set) => {
    const promise = fetchHeatmapDataIDs().then((data: string[]) => {
      return data
    })
    set(baseAtom, promise)
  })
  return [valueAtom, loadAtom]
}

export const [heatmapDataIDsAtom, loadHeatmapDataIDsAtom] =
  createHeatmapDataIDsAtom()

/***
 *
 * Landscape1DData
 *
 * */

// 0 is prefix, 1 is suffix
export const landscape1dDataIDAtom = atom<string[] | null>(null)

const createLandscape1DDataAtom = () => {
  const baseAtom = atom<Landscape1dData | Promise<Landscape1dData> | null>(null)
  const valueAtom = atom(async (get) => get(baseAtom))
  const loadAtom = atom(null, async (get, set) => {
    const landscape1dDataID = get(landscape1dDataIDAtom)
    if (!landscape1dDataID) return
    const promise = fetchLandscape1DData(landscape1dDataID).then(
      (data: Landscape1dData) => {
        console.log("LLANDSCAPEQ1d data", data)
        return data
      }
    )
    set(baseAtom, promise)
  })
  return [valueAtom, loadAtom]
}

export const [landscape1dDataDemoAtom, loadLandscape1dDataDemoAtom] =
  createLandscape1DDataAtom()
