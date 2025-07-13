import { api } from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name?: string;
    };
  };
}

interface User {
  id: string;
  email: string;
  name: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      // Simpan token dan user dari response.data.data
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.user;
    },
    // onSuccess tidak perlu set user lagi karena sudah di atas
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get<User>("/auth/me");
      return response.data;
    },
    enabled: !!localStorage.getItem("token"),
    retry: 1,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
