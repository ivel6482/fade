import { useMutation } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance"

export const useCreateBarbershop = () => {
  return useMutation({
    mutationKey: ["create-barbershop"],
    mutationFn: async ({ barbershop }) => {
      const res = await fadeApi.post('/barbershops', barbershop);
      return res.data;
    }
  });
}

export const useUpdateBarbershop = () => {
  return useMutation({
    mutationKey: ["update-barbershop"],
    mutationFn: async ({ id, barbershop }) => {
      await fadeApi.put(`/barbershops/${id}`, barbershop)
    }
  })
}


export const useDeleteBarbershop = () => {
  return useMutation({
    mutationKey: ["delete-barbershop"],
    mutationFn: async ({ id }) => {
      await fadeApi.delete(`/barbershops/${id}`);
    }
  });
}
