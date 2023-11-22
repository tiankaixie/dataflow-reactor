"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadConfusionMatrixBarDataAtom,
  systemConfigAtom,
} from "@/lib/losslensStore"

import ConfusionMatrixBarCore from "./ConfusionMatrixBarCore"

export default function ConfusionMatrixBarModule({
  height,
  width,
  modelIdModeIds,
}) {
  const [systemConfig] = useAtom(systemConfigAtom)
  const [data, fetchData] = useAtom(loadConfusionMatrixBarDataAtom)

  useEffect(() => {
    if (systemConfig) {
      fetchData(modelIdModeIds)
    }
  }, [systemConfig, fetchData, modelIdModeIds])

  if (data) {
    return (
      <div className="w-full">
        <ConfusionMatrixBarCore height={height} width={width} data={data} />
      </div>
    )
  }

  return (
    <div
      className={"flex h-[550px] flex-col justify-center w-full text-center "}
    >
      Confusion Matrix View is currently not available.
    </div>
  )
}
