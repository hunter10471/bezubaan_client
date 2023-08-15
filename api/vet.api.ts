import axios from 'axios';
import { baseUrl } from '../constants';
import { IUser, RegisterUser } from './../interfaces/User.interface';
import { IVet } from '../interfaces/Vet.interface';

export const createVet = async (data: RegisterUser) => {
    const url = `${baseUrl}/auth/signup-vet`;
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

export const loginVet = async (data: {
    username: string;
    password: string;
}) => {
    const url = `${baseUrl}/auth/login-vet`;
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

export const getVetsByQuery = async (query: string) => {
    const url = `${baseUrl}/vet/get-vets-by-query?query=${query}`;
    try {
        const res = await axios.get<IVet[]>(url);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        }
        console.error(error);
    }
};

export const getAllVets = async () => {
    const url = `${baseUrl}/vet/get-all-vets?approved=true`;
    try {
        const res = await axios.get<IVet[]>(url);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        }
        console.error(error);
    }
};

export const getClosestVets = async (lat: number, long: number) => {
    const url = `${baseUrl}/vet/get-vets-by-distance/${lat}/${long}`;
    try {
        const res = await axios.get<IVet[]>(url);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios request failed',
                error.response?.data,
                error.toJSON()
            );
        }
        console.error(error);
    }
};
