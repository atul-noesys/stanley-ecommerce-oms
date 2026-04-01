import { useQuery } from "@tanstack/react-query";

export interface CurrentUser {
  firstName: string;
  email: string;
  lastName: string;
  userName: string;
  roleId: string;
}

const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const token = localStorage.getItem("access_token");
  console.log(
    "Token from localStorage:",
    token ? "Token found" : "No token found"
  );

  // Format the authorization header with Bearer prefix if not already present
  const authHeader = token
    ? token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`
    : null;
  console.log(
    "Auth header being sent:",
    authHeader ? "Header set" : "No header"
  );

  const response = await fetch("/api/user/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && { Authorization: authHeader }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 0,
  });
};
