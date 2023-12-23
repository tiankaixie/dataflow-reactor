import Heatmap from "@/components/visualization/HeatmapModule"
import Landscape1D from "@/components/visualization/Landscape1DModule"

export default function Dashboard() {
  return (
    <section className=" container mx-auto px-2 pt-4">
      <div className="col-span-12 ">
        <h1 className="text-black font-bold text-5xl">
          Model Parameter Heatmap and Landscape 1D profile
        </h1>
      </div>
      <div className=" grid grid-cols-12 content-center gap-6 h-[calc(100vh-6rem)] ">
        <div className="col-span-4 aspect-square">
          <Heatmap />
        </div>
        <div className="col-span-4 aspect-square">
          <Landscape1D />
        </div>
      </div>
    </section>
  )
}
