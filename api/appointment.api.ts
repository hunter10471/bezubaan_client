import axios from 'axios';
import { baseUrl } from '../constants';
import {
    IAppointment,
    ICreateAppointment,
} from '../interfaces/Appointment.interface';

export const createAppointment = async (data: ICreateAppointment) => {
    const url = `${baseUrl}/appointment/create-appointment`;
    try {
        const res = await axios.post<IAppointment>(url, data);
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

export const getUserAppointments = async (id: string, active?: boolean) => {
    const url = `${baseUrl}/appointment/get-appointment-by-user-id/${id}?active=${active}`;
    try {
        const res = await axios.get<IAppointment[]>(url);
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

export const getVetAppointments = async (vetId: string) => {
    const url = `${baseUrl}/appointment/get-appointment-by-vet-id/${vetId}?active=true`;
    try {
        const res = await axios.get<IAppointment[]>(url);
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

export const updateAppointment = async (
    appointmentId: string,
    data: Partial<IAppointment>
) => {
    const url = `${baseUrl}/appointment/update-appointment-by-id/${appointmentId}`;
    try {
        const res = await axios.put<IAppointment[]>(url, data);
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
