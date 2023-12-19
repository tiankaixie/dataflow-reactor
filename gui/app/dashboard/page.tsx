import Heatmap from "@/components/visualization/HeatmapModule"

export default function Dashboard() {
  return (
    <section className="ml-60 grid grid-cols-12 items-center gap-6 p-2">
      <div className="col-span-4 aspect-square">
        <Heatmap />
      </div>
    </section>
  )
}
