"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  landscape1dDataDemoAtom,
  landscape1dDataIDAtom,
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
    console.log("Landscape1D Data obtained: ")
    console.log(data)
    const landscapeComponents = data.map((d) => {
      return (
        <div className="col-span-1 aspect-square">
          <Landscape1DCore data={d} />
        </div>
      )
    })
    return <div className="grid grid-cols-3">{landscapeComponents}</div>
  }

  return <div></div>
}
