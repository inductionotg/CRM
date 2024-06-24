import axios from "axios"

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL
console.log("axuios instance",axiosInstance.defaults.baseURL)
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.timeout=2500

export default axiosInstance