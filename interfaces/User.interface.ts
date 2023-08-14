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
    pets: IPet[];
    appointments: IAppointment[];
}

export interface RegisterUser
    extends Omit<IUser, '_id' | 'pets' | 'appointments'> {}

export interface IUserInitialState extends Partial<IUser> {}
