import { handleAxiosError } from "@/utils/errorHandler";
import { axiosInstance } from "./axios";
import { LoginFormData, SignupFormData } from "@/types";

export const loginUser = async (credentials: LoginFormData) => {
  try {
    const response = await axiosInstance.put('/api/users', credentials);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const createUser = async (credentials: SignupFormData) => {
  try {
    const response = await axiosInstance.post('/api/users', credentials);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const getSingleUser = async (userID: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userID}`);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const getUserBookings = async (userID: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userID}/bookings`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};