import Heatmap from "@/components/visualization/HeatmapModule"
import Landscape1D from "@/components/visualization/Landscape1DModule"

export default function Dashboard() {
  return (
    <section className="ml-60 p-4">
      <div className="col-span-12 py-6">
        <h1 className="text-black font-bold text-5xl">
          Model Parameter Heatmap and Landscape 1D profile
        </h1>
      </div>
      <div className=" grid grid-cols-12 h-[calc(100vh-6rem)] ">
        <div className="col-span-4 aspect-square">
          <Heatmap />
        </div>
        <div className="col-span-8">
          <Landscape1D />
        </div>
      </div>
    </section>
  )
}
