import Link from "next/link"

import { siteConfig } from "@/config/site"
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
  return (
    <div className="fixed top-0 m-2 hidden h-[calc(100vh-1rem)] w-56 border  flex-col justify-between  p-2 lg:flex ">
      <div className="px-2">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <span className="font-title my-3 mb-5 inline-block text-lg">
            {siteConfig.name}
          </span>
        </Link>
        <div className="mb-2 mt-4 text-xs font-semibold">Parameters</div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  )
}
