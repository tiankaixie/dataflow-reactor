import Heatmap from "@/components/visualization/HeatmapModule"

export default function Dashboard() {
  return (
    <section className=" mx-auto grid grid-cols-12 items-center gap-6 p-2">
      <Heatmap />
    </section>
  )
}
