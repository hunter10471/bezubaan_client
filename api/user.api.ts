import axios from 'axios';
import { baseUrl } from '../constants';
import { IUser, RegisterUser } from './../interfaces/User.interface';

export const createUser = async (data: RegisterUser) => {
    const url = `${baseUrl}/auth/signup-user`;
    try {
        const res = await axios.post<IUser>(url, data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        } else {
            console.error(error);
        }
    }
};

export const loginUser = async (data: { email: string; password: string }) => {
    const url = `${baseUrl}/auth/login-user`;
    try {
        const res = await axios.post<IUser>(url, data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        } else {
            console.error(error);
        }
    }
};

export const updateUser = async (data: Partial<IUser>, id: string) => {
    const url = `${baseUrl}/user/update-user-by-id/${id}`;
    try {
        const res = await axios.put<IUser>(url, data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        } else {
            console.error(error);
        }
    }
};
