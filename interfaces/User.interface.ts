export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser {
  username: string;
  email: string;
  gender: Gender;
  avatar: string;
  dateOfBirth?: Date;
  password: string;
  _id: string;
  phone?: string;
}

export interface RegisterUser extends Omit<IUser,'_id'>{}

export interface IUserInitialState extends Partial<IUser> {}


