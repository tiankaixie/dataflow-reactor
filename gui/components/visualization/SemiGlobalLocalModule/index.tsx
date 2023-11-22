"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadSemiGlobalLocalStructureAtom,
  modelUIListAtom,
  systemConfigAtom,
  updateSelectedModeIdListAtom,
} from "@/lib/losslensStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import SemiGlobalLocalCore from "./SemiGlobalLocalCore"

export default function SemiGlobalLocalModule({ height, width }) {
  const [systemConfig] = useAtom(systemConfigAtom)
  const [data, fetchData] = useAtom(loadSemiGlobalLocalStructureAtom)
  const [, updateSelectedModelIdModeId] = useAtom(updateSelectedModeIdListAtom)
  const [modelUIList] = useAtom(modelUIListAtom)

  useEffect(() => {
    if (systemConfig) {
      fetchData()
    }
  }, [systemConfig, fetchData])
  const canvasHeight = height - 170
  const canvasWidth = width - 30

  if (data && modelUIList?.length > 0) {
    return (
      <div className="w-full text-center">
        <div className="px-4 text-lg font-medium font-serif">
          Global Structure
        </div>
        <div className="w-full mt-2 px-4">
          <div className="w-full h-4 border-t border-l border-r border-black"></div>
        </div>

        <SemiGlobalLocalCore
          height={canvasHeight / 2}
          width={canvasWidth}
          data={data}
          updateSelectedModelIdModeId={updateSelectedModelIdModeId}
          modelUIList={modelUIList}
          modelUI={modelUIList[0]}
        />
        <Separator />
        <SemiGlobalLocalCore
          height={canvasHeight / 2}
          width={canvasWidth}
          data={data}
          updateSelectedModelIdModeId={updateSelectedModelIdModeId}
          modelUIList={modelUIList}
          modelUI={modelUIList[1]}
        />
      </div>
      // <Card className="w-full">
      //   <CardHeader>
      //     <CardTitle>Semi-Global-Local Structure</CardTitle>
      //     <CardDescription>Semi-Global-Local Structure </CardDescription>
      //   </CardHeader>
      //   <CardContent>
      //     <SemiGlobalLocalCore
      //       height={canvasHeight}
      //       width={canvasWidth}
      //       data={data}
      //       updateSelectedModelIdModeId={updateSelectedModelIdModeId}
      //       modelUIList={modelUIList}
      //     />
      //   </CardContent>
      // </Card>
    )
  }

  return <div className={"w-full text-center"}>Empty</div>
}
