import { useQuery } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useBarberAvailableAppointments = (barberId) => {
  return useQuery({
    queryKey: ["barber-available-appointments"],
    queryFn: async () => {
      const response = await fadeApi.get(`/barbers/${barberId}/appointments/available`);

      return response.data.appointments;
    },
    enabled: !!barberId
  });
}

export const useBarberBookedAppointments = (barberId) => {
  return useQuery({
    queryKey: ["barber-booked-appointments"],
    queryFn: async () => {
      const response = await fadeApi.get(`/barbers/${barberId}/appointments/booked`);

      return response.data.appointments;
    }
  });
}

export const useBarberCompletedAppointments = (barberId) => {
  return useQuery({
    queryKey: ["barber-completed-appointments"],
    queryFn: async () => {
      const response = await fadeApi.get(`/barbers/${barberId}/appointments/complete`);

      return response.data.appointments;
    }
  });
}
