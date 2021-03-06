import axios from "axios"

// const axiosInstance = axios.create({
//   baseURL: "https://opendata.resas-portal.go.jp/api/v1/",
//   headers: {
//     "X-API-KEY": import.meta.env.VITE_PROF_API_KEY,
//   },
// })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LAMBDA_URL,
})

export default axiosInstance
