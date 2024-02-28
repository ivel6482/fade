import { useMutation } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useCancelAppointment = () => {
  return useMutation({
    mutationKey: ["cancel-appointment"],
    mutationFn: async ({ appointmentId }) => {
      const response = await fadeApi.put(`/appointments/${appointmentId}/cancel`);

      return response.data;
    }
  });
}

export const useDeleteAppointment = () => {
  return useMutation({
    mutationKey: ["delete-appointment"],
    mutationFn: async ({ appointmentId }) => {
      const response = await fadeApi.delete(`/appointments/${appointmentId}`);

      return response.data;
    }
  });
}
