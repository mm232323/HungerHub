import type { HealthStatus } from "@/types";
import { customFetch } from "@/utils/customFetch";

export const healthCheck = async (
  options?: RequestInit,
): Promise<HealthStatus> => {
  return customFetch<HealthStatus>("/api/healthz", {
    ...options,
    method: "GET",
  });
};
