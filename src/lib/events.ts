import { handleAxiosError } from "@/utils/errorHandler";
import { axiosInstance } from "./axios";


export const getAllEvents = async () => {
  try {
    const response = await axiosInstance.get('/api/events');
    console.log("Fetched events data:", response.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const getSingleEvent = async (eventID: string) => {
  try {
    const response = await axiosInstance.get(`/api/events/${eventID}`);
    console.log("Fetched events data:", response.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};
