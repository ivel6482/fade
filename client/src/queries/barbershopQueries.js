import { useQuery } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance";

export const useBarbershops = () => {
  return useQuery({
    queryKey: ["barbershops"],
    queryFn: async () => {
      const res = await fadeApi.get('/barbershops');
      return res.data.barbershops;
    }
  });
}

export const useBarbershop = (id) => {
  return useQuery({
    queryKey: ["barbershop", id],
    queryFn: async () => {
      const res = await fadeApi.get(`/barbershops/${id}`);
      return res.data;
    },
    enabled: !!id
  });
}

export const useBarbershopBarbers = (barbershopId) => {
  return useQuery({
    queryKey: ["barbershop-barbers", barbershopId],
    queryFn: async () => {
      const res = await fadeApi.get(`/barbershops/${barbershopId}/barbers`);
      return res.data.barbers;
    },
    enabled: !!barbershopId
  });
}
