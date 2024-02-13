import { useMutation } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useCreateAppointment = () => {
  return useMutation({
    mutationKey: ["create-appointment"],
    mutationFn: async ({ time, barberId }) => {
      const newAppointment = {
        time,
        barberId,
      };

      const response = await fadeApi.post('/appointments', newAppointment)

      return response.data;
    }
  });
}
