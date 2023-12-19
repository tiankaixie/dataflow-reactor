import axios from "axios"

export const fetchHeatmapData = async (heatmapID: string) => {
  const response = await axios.get(`api/heatmap-data/${heatmapID}`)
  return await response.data
}

export const fetchLandscape1DData = async (landscape1dDataID: string) => {
  const response = await axios.get(`api/landscape1d-data/${landscape1dDataID}`)
  return await response.data
}
