import { useQuery } from "@tanstack/react-query";
import { fadeApi } from "../utils/axiosInstance";

export const useUsers = (transformFunction) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fadeApi.get('/users');
      return res.data.users;
    },
    select: (data) => {
      if (transformFunction) {
        return data.map(transformFunction);
      }
    }
  });
}

export const useUserActiveAppointments = (userId) => {
  return useQuery({
    queryKey: ["user-active-appointments", userId],
    queryFn: async () => {
      const response = await fadeApi.get(`/users/${userId}/appointments`);

      return response.data.appointments;
    },
    enabled: !!userId
  });
}

export const useUserCompletedAppointments = (userId) => {
  return useQuery({
    queryKey: ["user-completed-appointments", userId],
    queryFn: async () => {
      const response = await fadeApi.get(`/users/${userId}/appointments/complete`)

      return response.data.appointments;
    },
    enabled: !!userId
  });
}
