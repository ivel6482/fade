import { useQuery } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance";

export const useBarbershops = () => {
  return useQuery({
    queryKey: ["barbershops"],
    queryFn: async () => {
      const res = await fadeApi.get('/barbershops');
      return res.data;
    }
  });
}
