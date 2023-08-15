import { PaymentStatus, Status, Type } from '../common/enum';

export interface IAppointment {
    _id: string;
    appointmentDate: Date;
    status: Status;
    paymentStatus: PaymentStatus;
    type: Type;
    amount: number;
    vetId: string;
    userId: string;
    petId: string;
    review: string;
    rating: number;
}

export interface ICreateAppointment extends Omit<IAppointment, '_id'> {}
