import { useMutation } from "@tanstack/react-query"
import { fadeApi } from "../utils/axiosInstance"

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
    }) => {
      const res = await fadeApi.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        role: "customer"
      });
      return res.data;
    }
  })
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const res = await fadeApi.post("/auth/login", {
        email, password
      });
      return res.data;
    },
  });
}

export const useRegisterBarber = () => {
  return useMutation({
    mutationKey: ["register-barber"],
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
    }) => {
      const res = await fadeApi.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        role: "barber"
      });
      return res.data;
    }
  })
}
