import { FieldOfStudy, Gender, University } from '../common/enum';

export interface IVet {
    _id: string;

    username: string;

    email: string;

    password: string;

    gender: Gender;

    avatar: string;

    yearsOfExperience: number;

    specializations: string[];

    fieldOfStudy: FieldOfStudy;

    university: University;

    degreeImage: string;

    licenseImage: string;

    isApproved: boolean;

    clinicName: string;

    address: string;

    licenseNumber: string;

    location: {
        type: string;
        coordinates: number[];
    };

    description: string;

    fee: number;
}
