"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadConfusionMatrixBarDataAtom,
  loadRegressionDifferenceDataAtom,
  systemConfigAtom,
} from "@/lib/losslensStore"

import RegressionDifferenceCore from "./RegressionDifferenceCore"

export default function RegressionDifferenceModule({
  height,
  width,
  modelIdModeIds,
}) {
  const [systemConfig] = useAtom(systemConfigAtom)
  const [data, fetchData] = useAtom(loadRegressionDifferenceDataAtom)

  useEffect(() => {
    if (systemConfig) {
      fetchData(modelIdModeIds)
    }
  }, [systemConfig, fetchData, modelIdModeIds])

  if (data) {
    return (
      <div className="w-full">
        <RegressionDifferenceCore height={height} width={width} data={data} />
      </div>
    )
  }

  return (
    <div
      className={"flex h-[550px] flex-col justify-center w-full text-center "}
    >
      Regression Difference View is currently not available.
    </div>
  )
}
