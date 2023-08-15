import { Gender } from '../common/enum';
import { IAppointment } from './Appointment.interface';
import { IPet } from './Pet.interface';

export interface IUser {
    username: string;

    email: string;

    gender: Gender;

    avatar: string;

    password: string;

    _id: string;

    lat: number;

    long: number;

    location?: {
        type: string;
        coordinates: number[];
    };

    pets: IPet[];

    appointments: IAppointment[];
}

export interface RegisterUser
    extends Omit<IUser, '_id' | 'pets' | 'appointments' | 'lat' | 'long'> {}

export interface IUserInitialState extends Partial<IUser> {}
