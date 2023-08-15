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
