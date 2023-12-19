import Heatmap from "@/components/visualization/HeatmapModule"
import Landscape1D from "@/components/visualization/Landscape1DModule"

export default function Dashboard() {
  return (
    <section className="ml-60 grid grid-cols-12 items-center gap-6 p-2">
      <div className="col-span-4 aspect-square">
        <Heatmap />
      </div>
      <div className="col-span-4 aspect-square">
        <Landscape1D />
      </div>
    </section>
  )
}
