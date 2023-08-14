import { AnimalType, Gender } from '../common/enum';
import { IUser } from './User.interface';

export interface IPet {
    _id: string;
    name: string;
    age: number;
    gender: Gender;
    image: string;
    animalType: AnimalType;
    species: string;
    ownerId: IUser;
}
