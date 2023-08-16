import axios from 'axios';
import { baseUrl } from '../constants';
import { IPet } from '../interfaces/Pet.interface';

export const getUserPets = async (id: string) => {
    const url = `${baseUrl}/pet/get-pet-by-userId/${id}`;
    try {
        const res = await axios.get<IPet[]>(url);
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

export const createPet = async (data: any) => {
    const url = `${baseUrl}/pet/create-pet`;
    try {
        const res = await axios.post<IPet[]>(url, data);
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
