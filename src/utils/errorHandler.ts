import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Handle different types of error responses
      const errorData = error.response.data;

      // Check for different error formats
      if (typeof errorData === 'string') {
        return errorData;
      }

      // Handle object error formats
      if (errorData) {
        // Check for error or message property
        if (errorData.error) {
          return errorData.error;
        }
        if (errorData.message) {
          return errorData.message;
        }
      }

      // Fallback for unknown error format
      return `Server error: ${error.response.status}`;
    }

    if (error.request) {
      return 'Unable to reach the server. Please check your internet connection.';
    }

    return error.message || 'An error occurred while processing your request.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
};