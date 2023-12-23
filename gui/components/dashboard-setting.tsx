"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useAtom } from "jotai"

import { siteConfig } from "@/config/site"
import {
  heatmapDataIDAtom,
  heatmapDataIDsAtom,
  loadHeatmapDataIDsAtom,
} from "@/lib/store"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function DashboardSetting() {
  const [data] = useAtom(heatmapDataIDsAtom)
  const [, fetchData] = useAtom(loadHeatmapDataIDsAtom)
  const [selectedHeatmapDataID, setSelectedHeatmapDataID] =
    useAtom(heatmapDataIDAtom)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  let selectList = (
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  )
  if (data) {
    selectList = (
      <SelectGroup>
        <SelectLabel>Heatmap Data</SelectLabel>
        {data.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectGroup>
    )
  }

  return (
    <div className="fixed top-0 m-2 hidden h-[calc(100vh-1rem)] w-56 border  flex-col justify-between  p-2 lg:flex ">
      <div className="px-2">
        {/* <Link href="/" className="flex items-center space-x-2"> */}
        {/*   <span className="font-title my-3 mb-5 inline-block text-lg"> */}
        {/*     {siteConfig.name} */}
        {/*   </span> */}
        {/* </Link> */}
        <div className="mb-2 mt-4 text-xs font-semibold">Parameters</div>
        <Select
          onValueChange={(value: string) => {
            setSelectedHeatmapDataID(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>{selectList}</SelectContent>
        </Select>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  )
}
