import { PaymentStatus, Status, Type } from '../common/enum';
import { IPet } from './Pet.interface';
import { IUser } from './User.interface';
import { IVet } from './Vet.interface';

export interface IAppointment {
    _id: string;
    appointmentDate: Date;
    status: Status;
    paymentStatus: PaymentStatus;
    type: Type;
    amount: number;
    vetId: IVet;
    userId: IUser;
    petId: IPet;
    review: string;
    rating: number;
}
