// utils/handleAxiosError.ts
import axios from "axios";

export class APIError extends Error {
  status: number;
  details?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    details?: Record<string, string>
  ) {
    super(message);
    this.status = status;
    this.name = "APIError";
    this.details = details;
  }
}

export const handleAxiosError = (error: unknown): APIError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data;

    const message = data?.message || "Terjadi kesalahan";
    const details = data?.errors; // objek validasi jika ada

    return new APIError(message, status, details);
  }

  return new APIError("Unknown error occurred", 500);
};
