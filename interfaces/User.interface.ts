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
  dateOfBirth:Date;
}

export interface IUserInitialState extends Partial<IUser> {

}


