import { useMutation } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useBarberUpdate = () => {
  return useMutation({
    mutationKey: ["update-barber"],
    mutationFn: async ({ barberId, infoToUpdate }) => {
      const res = await fadeApi.put(`/barbers/${barberId}`, infoToUpdate)

      return res.data;
    }
  });
}

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
