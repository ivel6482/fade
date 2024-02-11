import { useMutation } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useUserUpdate = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async ({ userId, infoToUpdate }) => {
      const response = await fadeApi.put(`/users/${userId}`, { ...infoToUpdate });

      return response.data;
    }
  })
}
