import { handleAxiosError } from "@/utils/errorHandler";
import { axiosInstance } from "./axios";
import { BookingFormData } from "@/types";


export const createBooking = async (bookingDetails: BookingFormData) => {
  try {
    const response = await axiosInstance.post('/api/bookings', bookingDetails);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};


export const getEventSeats = async (eventID: string) => {
  try {
    const response = await axiosInstance.get(`/api/events/${eventID}/seats`);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};