import { useEffect } from "react"
import { useAtom } from "jotai"

import {
  loadModelMetaDataListAtom,
  loadModelUIListAtom,
  systemConfigAtom,
  updateModelUIListAtom,
} from "@/lib/losslensStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { modelColor } from "@/styles/vis-color-scheme"

import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"

export default function ModelCardList() {
  const [systemConfig] = useAtom(systemConfigAtom)
  const [modelMetaDataList, fetchData] = useAtom(loadModelMetaDataListAtom)
  const [modelUIList, loadModelUIList] = useAtom(loadModelUIListAtom)
  const [, updateModelUIList] = useAtom(updateModelUIListAtom)

  useEffect(() => {
    if (systemConfig) {
      fetchData()
      loadModelUIList()
    }
  }, [systemConfig, fetchData, loadModelUIList])

  if (modelMetaDataList) {
    const modelCards = modelMetaDataList.map((model, index) => {
      const modelDescriptionUI = model.modelDescription.split(",").map((d) => {
        return <div className="font-serif text-lg">{d}</div>
      })
      const datasetDescriptionUI = model.modelDatasetDescription
        .split(",")
        .map((d) => {
          return <div className="font-serif text-lg">{d}</div>
        })
      return (
        <div className="w-full">
          <div className="flex items-center justify-left ">
            <svg width={20} height={20}>
              <circle fill={modelColor[index]} cx={10} cy={10} r={10}></circle>
            </svg>
            <span className="ml-2 text-xl font-serif font-semibold">
              {model.modelName}
            </span>
          </div>

          <div className=" pt-2 text-left">
            <Label className="font-serif text-lg font-semibold">
              {" "}
              Model Info
            </Label>
            <div className="pl-2">{modelDescriptionUI}</div>
            <Label className="font-serif text-lg font-semibold">Dataset:</Label>
            <div className="pl-2">{datasetDescriptionUI}</div>
            {/* <div className="w-full"> */}
            {/*   <Label className="font-serif text-lg font-semibold"> */}
            {/*     Number of Modes: */}
            {/*   </Label> */}
            {/*   <div className=" flex w-full flex-row gap-2"> */}
            {/*     <Slider */}
            {/*       defaultValue={[ */}
            {/*         modelUIList ? modelUIList[index].selectedNumberOfModes : 0, */}
            {/*       ]} */}
            {/*       max={model.numberOfModes} */}
            {/*       onValueChange={(value) => { */}
            {/*         updateModelUIList(value[0], index) */}
            {/*       }} */}
            {/*       step={1} */}
            {/*     /> */}
            {/*     <Input */}
            {/*       className="w-14 p-0" */}
            {/*       type="number" */}
            {/*       value={ */}
            {/*         modelUIList ? modelUIList[index].selectedNumberOfModes : 0 */}
            {/*       } */}
            {/*     /> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
          <Separator className="my-2" />
        </div>
      )

      // return (
      //   <Card className="w-full">
      //     <CardHeader>
      //       <CardTitle>
      //         <div className="flex gap-2">
      //           <svg width={15} height={15}>
      //             <rect fill={modelColor[index]} width={15} height={15}></rect>
      //           </svg>
      //           {model.modelName}
      //         </div>
      //       </CardTitle>
      //       <CardDescription>
      //         <Label> Model Info</Label>
      //         <div className="grid grid-cols-2">{modelDescriptionUI}</div>{" "}
      //       </CardDescription>
      //     </CardHeader>
      //     <CardContent>
      //       <Label> Dataset:</Label>{" "}
      //       <Badge variant="outline"> {model.modelDataset} </Badge>
      //       <CardDescription className="mt-2">
      //         <div className="grid grid-cols-2">{datasetDescriptionUI}</div>
      //       </CardDescription>
      //     </CardContent>
      //     <CardFooter>
      //       <div className="w-full">
      //         <Label>Number of Modes:</Label>
      //         <div className=" flex w-full flex-row gap-2">
      //           <Slider
      //             defaultValue={[
      //               modelUIList ? modelUIList[index].selectedNumberOfModes : 0,
      //             ]}
      //             max={model.numberOfModes}
      //             onValueChange={(value) => {
      //               updateModelUIList(value[0], index)
      //             }}
      //             step={1}
      //           />
      //           <Input
      //             className="w-20 p-1"
      //             type="number"
      //             value={
      //               modelUIList ? modelUIList[index].selectedNumberOfModes : 0
      //             }
      //           />
      //         </div>
      //       </div>
      //     </CardFooter>
      //   </Card>
      // )
    })
    return (
      <div className="flex h-[900px] flex-col justify-start gap-2 pt-4">
        {modelCards}
      </div>
    )
  }
  return <div className={" h-[900px] w-full  text-center "}>Empty</div>
}
