// utils/isAxiosErrorWithStatus.ts
import { AxiosError } from "axios";

export function isAxiosErrorWithStatus(
  error: unknown,
  statusCode: number
): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError &&
    (error as AxiosError).response?.status === statusCode
  );
}
