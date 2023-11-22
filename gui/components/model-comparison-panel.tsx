import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadModelMetaDataListAtom,
  selectedModeIdListAtom,
  systemConfigAtom,
} from "@/lib/losslensStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ConfusionMatrixBarModule from "./visualization/ConfusionMatrixBarModule"
import LayerSimilarityModule from "./visualization/LayerSimilarityModule"
import LossLandscape from "./visualization/LossLandscapeModule"
import MergeTreeModule from "./visualization/MergeTreeModule"
import PersistenceBarcode from "./visualization/PersistenceBarcodeModule"
import RegressionDifferenceModule from "./visualization/RegressionDifferenceModule"

interface ModelComparisonPanelProps {
  height: number
  width: number
}

export default function ModelComparisonPanel({ height, width }) {
  const [systemConfig] = useAtom(systemConfigAtom)
  const [selectedModesList] = useAtom(selectedModeIdListAtom)
  const [modelMetaDataList, fetchData] = useAtom(loadModelMetaDataListAtom)

  useEffect(() => {
    if (systemConfig) {
      fetchData()
    }
  }, [systemConfig, fetchData])

  const canvasHeight = height - 170
  const canvasWidth = width - 100
  let selectedModesListStr = ""
  if (selectedModesList && selectedModesList.length === 1) {
    selectedModesListStr = selectedModesList[0]
  } else if (selectedModesList && selectedModesList.length === 2) {
    selectedModesListStr = selectedModesList[0] + " vs " + selectedModesList[1]
  }

  if (modelMetaDataList) {
    const modeCards = selectedModesList.map((modelIdModeId, mId) => {
      const ids = modelIdModeId.split("-")
      return (
        <div className="w-full">
          <div className="px-4 text-lg font-medium font-serif">
            {"Local Structure [" + modelIdModeId + "]"}
          </div>
          <div className="w-full mt-2">
            <div className="w-full h-4 border-t border-l border-r border-black"></div>
          </div>
          <div className="flex flex-row gap-2">
            <div>
              <LossLandscape
                height={canvasHeight / 4}
                width={canvasWidth / 4}
                modelId={ids[0]}
                modeId={ids[1]}
                leftRight={mId === 0 ? "left" : "right"}
              />
              <PersistenceBarcode
                height={canvasHeight / 4}
                width={canvasWidth / 4}
                modelId={ids[0]}
                modeId={ids[1]}
                leftRight={mId === 0 ? "left" : "right"}
              />
            </div>
            <MergeTreeModule
              height={canvasHeight / 2}
              width={canvasWidth / 4}
              modelId={ids[0]}
              modeId={ids[1]}
              leftRight={mId === 0 ? "left" : "right"}
            />
          </div>
        </div>
      )
    })

    let predictionComparison = null
    if (
      selectedModesList.length === 2 &&
      systemConfig?.selectedCaseStudy === "pinn"
    ) {
      predictionComparison = (
        <RegressionDifferenceModule
          height={canvasHeight / 2}
          width={canvasWidth / 2}
          modelIdModeIds={selectedModesList}
        />
      )
    } else if (selectedModesList.length === 2) {
      predictionComparison = (
        <ConfusionMatrixBarModule
          height={canvasHeight / 2}
          width={canvasWidth / 2}
          modelIdModeIds={selectedModesList}
        />
      )
    }

    const similarityPerdictions =
      selectedModesList.length === 2 ? (
        <div className="flex w-full flex-row gap-2">
          <LayerSimilarityModule
            height={canvasHeight / 2}
            width={canvasWidth / 2}
            modelIdModeIds={selectedModesList}
          />
          {predictionComparison}
        </div>
      ) : null

    return (
      <div className="w-full text-center">
        <div className="flex flex-row gap-2">{modeCards}</div>
        <div className="px-4 text-lg font-medium font-serif">
          Mode Comparison
        </div>
        <div className="w-full mt-2">
          <div className="w-full h-4 border-t border-l border-r border-black"></div>
        </div>
        <div className="flex flex-row gap-2">{similarityPerdictions}</div>
      </div>
    )
    // return (
    //   <Card className=" w-full ">
    //     <CardHeader>
    //       <CardTitle>Mode Comparison</CardTitle>
    //       {/* <CardDescription> {selectedModesListStr} </CardDescription> */}
    //     </CardHeader>
    //     <CardContent>
    //       <div className="flex flex-row gap-2">{modeCards}</div>
    //       <div className="flex flex-row gap-2">{similarityPerdictions}</div>
    //     </CardContent>
    //   </Card>
    // )
  }
  return <div className={"h-[900px] w-full text-center "}>Empty</div>
}
