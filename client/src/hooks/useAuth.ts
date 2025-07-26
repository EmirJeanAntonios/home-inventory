import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login, logout, register, verifyToken, getToken } from "../services/auth.api";
import type { User } from "../services/auth.api";

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Hook to get current user
export function useUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: verifyToken,
    enabled: !!getToken(), // Only run if we have a token
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });
}

// Hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      // Set user data in cache
      queryClient.setQueryData(authKeys.user, data.user);
      // Navigate to dashboard
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Hook for register
export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register(name, email, password),
    onSuccess: (data) => {
      // Set user data in cache
      queryClient.setQueryData(authKeys.user, data.user);
      // Navigate to dashboard
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// Hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Navigate to login
      navigate("/auth/login");
    },
  });
};

// Hook to check if user is authenticated
export function useIsAuthenticated() {
  const { data: user, isLoading, isError } = useUser();
  
  return {
    isAuthenticated: !!user && !isError,
    isLoading,
    user,
  };
}
