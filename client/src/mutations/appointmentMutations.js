import { useMutation } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useCreateAppointment = () => {
  return useMutation({
    mutationKey: ["create-appointment"],
    mutationFn: async ({ appointment }) => {
      const res = await fadeApi.post('/appointments', appointment);
      return res.data;
    }
  });
}

export const useBookAppointment = () => {
  return useMutation({
    mutationKey: ["book-appointment"],
    mutationFn: async ({ appointmentId, userId }) => {
      const res = await fadeApi.put(`/appointments/${appointmentId}/book`, { userId, })

      return res.data;
    }
  })
}

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
