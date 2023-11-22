import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className=" mx-auto grid grid-cols-12 items-center gap-6 p-2">
      <div className="col-span-12 flex h-96 items-end p-4 md:col-span-8 lg:col-span-6">
        <p className="font-landing text-2xl font-medium text-foreground">
          Tiankai Xie is a multidisciplinary researcher specializing in
        </p>
      </div>
      <div className="col-span-12 ">
        <hr className="border-t-1" />
      </div>
      <div className="col-span-12">
        <div className="grid grid-cols-4 gap-2">
          {/* <div className="col-span-4  bg-primary p-4 md:col-span-2 lg:col-span-1"> */}
          {/*   <div className="aspect-square p-4"></div> */}
          {/*   <div>Articles </div> */}
          {/* </div> */}
          <div className="col-span-4  bg-primary p-4 md:col-span-2 lg:col-span-1">
            <div className="aspect-square p-4">
            </div>
            <div>Gallery (Coming soon)</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 ">
        <hr className="border-t-1" />
      </div>
      <div className="col-span-12 ">
        <p className="text-center">
          copy right © 2023 Tiankai Xie. All rights reserved.
        </p>
      </div>
    </section>
  )
}
