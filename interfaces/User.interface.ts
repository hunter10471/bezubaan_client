export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  gender: Gender;
  avatar: string;
}
