import { handleAxiosError } from "@/utils/errorHandler";
import { axiosInstance } from "./axios";


export const getAllVenues = async () => {
  try {
    const response = await axiosInstance.get('/api/venues');
    console.log("Fetched venues data:", response.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};
