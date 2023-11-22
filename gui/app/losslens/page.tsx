"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { atom, useAtom, useSetAtom } from "jotai"

import { siteConfig } from "@/config/site"
import { systemConfigAtom } from "@/lib/losslensStore"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Loader from "@/components/loader"
import ModelCardList from "@/components/model-card-list"
import ModelComparisonPanel from "@/components/model-comparison-panel"
import SemiGlobalLocalModule from "@/components/visualization/SemiGlobalLocalModule"

type WindowDimentions = {
  width: number | undefined
  height: number | undefined
}

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return (): void => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimensions
}

const selectedCaseStudyUIAtom = atom<string | null>(null)

export default function LossLens() {
  const { height, width } = useWindowDimensions()
  const [selectedCaseStudyUI, setSelectedCaseStudyUI] = useAtom(
    selectedCaseStudyUIAtom
  )
  const [systemConfigs, setSystemConfigs] = useAtom(systemConfigAtom)
  const handleClick = () => {
    console.log("selectedCaseStudyUI", selectedCaseStudyUI)
    setSystemConfigs({
      ...systemConfigs,
      selectedCaseStudy: selectedCaseStudyUI,
    })
  }

  const caseStudyItems = systemConfigs?.caseStudyList.map((key) => (
    <SelectItem className="w-60" value={key}>
      {systemConfigs.caseStudyLabels[key]}
    </SelectItem>
  ))

  return (
    <section className="p-2">
      <div className="grid grid-cols-9 gap-2 ">
        <div className="col-span-1">
          <Link href="/" className="hidden space-x-2 md:flex">
            <span className="hidden font-serif text-3xl font-extrabold   sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <div className="pb-2">
            {/* <Label className="w-30 text-xl font-serif">Case Study</Label> */}
            <div className="flex">
              <div className="w-40">
                <Select
                  onValueChange={(value: string) => {
                    setSelectedCaseStudyUI(value)
                  }}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select Case Study" />
                  </SelectTrigger>
                  <SelectContent className="w-40" position="popper">
                    {caseStudyItems}
                  </SelectContent>
                </Select>
              </div>

              <Button size={"xs"} variant="ghost" onClick={handleClick}>
                <Icons.play className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Suspense fallback={<Loader />}>
            <ModelCardList />
          </Suspense>
        </div>
        <div className="col-span-4">
          <Suspense fallback={<Loader />}>
            <SemiGlobalLocalModule height={height} width={(width * 4) / 9} />
          </Suspense>
        </div>
        <div className="col-span-4">
          <Suspense fallback={<Loader />}>
            <ModelComparisonPanel height={height} width={(width * 4) / 9} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
