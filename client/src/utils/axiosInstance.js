import axios from "axios";

export const fadeApi = axios.create({
  baseURL: import.meta.env.VITE_FADE_API
})

fadeApi.defaults.headers.post["Content-Type"] = "application/json";

fadeApi.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', "",)}`

  return request;
});
