import axios from 'axios';
import { IUser } from './../interfaces/User.interface';
const baseUrl = 'http://192.168.100.68:5000';

export const createUser = async (data: IUser) => {
  const url = `${baseUrl}/auth/signup`;
  try {
    const res = await axios.post<IUser>(url, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const url = `${baseUrl}/auth/login`;
  try {
    const res = await axios.post<IUser>(url, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
