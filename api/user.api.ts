import axios from 'axios';
import { IUser, RegisterUser } from './../interfaces/User.interface';
const baseUrl = 'http://192.168.100.68:5000';

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
  console.log(data)
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
