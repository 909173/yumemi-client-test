import axios from "axios"
import { config } from "dotenv"
config()

const axiosInstance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1/",
  headers: {
    "X-API-KEY": `${process.env.VITE_PROF_API_KEY}`,
  },
})

export default axiosInstance
