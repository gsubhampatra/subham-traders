import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import api, { API_ROUTE } from "../../../api";

function ProtectedRoutes() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get(API_ROUTE.AUTH.CURRENT_USER);
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (user === null || error) {
    // If user is null or there is an error, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children routes
  return <Outlet />;
}

export default ProtectedRoutes;
