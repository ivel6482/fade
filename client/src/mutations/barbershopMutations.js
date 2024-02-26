import { useMutation } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance"

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
