import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

/*api/auth*/
export default function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return (await apiClient.get(`/auth/profile?returnTo=${window.location}`)).data?.user;
}});

  return {
    user,
    isLoading,
  };
}

export function getLoginUrl() {
  const baseUrl = import.meta.env.VITE_API_HOST ?? "http://localhost:8000";
  return `${baseUrl}/auth/login?returnTo=${window.location}`;
}

export function getSignupUrl() {
  const baseUrl = import.meta.env.VITE_API_HOST ?? "http://localhost:8000";
  return `${baseUrl}/auth/login?screen_hint=signup`;
}

export function getLogoutUrl() {
  const baseUrl = import.meta.env.VITE_API_HOST ?? "http://localhost:8000";
  return `${baseUrl}/auth/logout?returnTo=${window.location.origin}`;
}
