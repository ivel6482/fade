import axios from "axios";

export const fadeApi = axios.create({
  baseURL: import.meta.env.VITE_FADE_API
})

