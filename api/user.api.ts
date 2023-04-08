import axios from 'axios';
import { baseUrl } from '../constants';
import { IUser, RegisterUser } from './../interfaces/User.interface';

export const createUser = async (data: RegisterUser) => {
  const url = `${baseUrl}/auth/signup`;
  try {
    const res = await axios.post<IUser>(url, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request failed", error.response?.data, error.toJSON());
    } else {
      console.error(error);
    }
  }
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const url = `${baseUrl}/auth/login`;
  try {
    const res = await axios.post<IUser>(url, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request failed", error.response?.data, error.toJSON());
    } else {
      console.error(error);
    }
  }
};
