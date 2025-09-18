import { facilityService } from "@/features/facility/services/facility.service";
import { useQuery } from "@tanstack/react-query";

export const useFacility = () => {
  const facilities = useQuery({
    queryKey: ["facilities"],
    queryFn: facilityService.getAll,
  });

  return {
    facilities,
  };
};
