import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { useAuthStore } from "@/stores/auth.store";

export const useDashboard = () => {
  const { user } = useAuthStore();
  console.log("User role:", user?.role); // Debugging line to check user role
  const ownerDashboard = useQuery({
    queryKey: ["owner-dashboard"],
    queryFn: dashboardService.getOwnerDashboard,
    enabled: user?.role === "owner",
  });
  const adminDashboard = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: dashboardService.getAdminDashboard,
    enabled: user?.role === "admin",
  });

  return {
    ownerDashboard,
    adminDashboard,
  };
};
