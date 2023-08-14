import { FieldOfStudy, Gender, University } from '../common/enum';

export interface IVet {
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
}
