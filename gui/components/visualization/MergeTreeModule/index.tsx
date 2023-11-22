"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadMergeTreeData2Atom,
  loadMergeTreeDataAtom,
  systemConfigAtom,
} from "@/lib/losslensStore"

import MergeTreeCore from "./MergeTreeCore"

export default function MergeTree({
  height,
  width,
  modelId,
  modeId,
  leftRight,
}) {
  const [systemConfig] = useAtom(systemConfigAtom)
  let loadMergeTreeDataAbsAtom = loadMergeTreeDataAtom
  if (leftRight === "right") {
    loadMergeTreeDataAbsAtom = loadMergeTreeData2Atom
  }

  const [data, fetchData] = useAtom(loadMergeTreeDataAbsAtom)
  useEffect(() => {
    if (systemConfig) {
      fetchData(modelId, modeId)
    }
  }, [systemConfig, fetchData, modelId, modeId])

  if (data) {
    return (
      <div className="w-full">
        <MergeTreeCore height={height} width={width} data={data} />
      </div>
    )
  }

  return (
    <div className={" h-[900px] w-full bg-gray-100 text-center "}>Empty</div>
  )
}
