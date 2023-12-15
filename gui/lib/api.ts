import axios from "axios"

export const fetchHeatmapData = async (heatmapID: string) => {
  const response = await axios.get(`api/heatmap-data/${heatmapID}`)
  return await response.data
}
