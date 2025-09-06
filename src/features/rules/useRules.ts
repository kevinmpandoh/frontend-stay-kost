import { ruleService } from "@/features/rules/rule.service";
import { useQuery } from "@tanstack/react-query";

export const useRules = () => {
  const rules = useQuery({
    queryKey: ["rules"],
    queryFn: ruleService.getAll,
  });

  return {
    rules,
  };
};
