import { useQuery } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance";

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await fadeApi.get('/appointments');
      return {
        appointments: res.data.appointments,
        count: res.data.count
      };
    }
  });
}
