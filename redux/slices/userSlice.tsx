import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserInitialState } from '../../interfaces/User.interface';
import { IPet } from '../../interfaces/Pet.interface';
import { IAppointment } from '../../interfaces/Appointment.interface';
import { IVet } from '../../interfaces/Vet.interface';

const initialState: IUserInitialState = {
    username: undefined,
    email: undefined,
    avatar: undefined,
    gender: undefined,
    _id: undefined,
    lat: undefined,
    long: undefined,
    appointments: [],
    pets: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser | IVet>) => {
            const { _id, username, avatar, email, gender, lat, long } =
                action.payload;
            state._id = _id;
            state.username = username;
            state.avatar = avatar;
            state.email = email;
            state.gender = gender;
            (state.lat = lat), (state.long = long);
        },
        logout: (state) => {
            let userDetails = Object.keys(initialState);
            userDetails.forEach(
                (key) => (state[key as keyof IUserInitialState] = undefined)
            );
        },
        updateLocation: (
            state,
            action: PayloadAction<{ lat: number; long: number }>
        ) => {
            state.lat = action.payload.lat;
            state.long = action.payload.long;
        },
        updatePets: (state, action: PayloadAction<IPet[]>) => {
            state.pets = action.payload;
        },
        updateAppointments: (state, action: PayloadAction<IAppointment[]>) => {
            state.appointments = action.payload;
        },
    },
});

export const { login, logout, updateLocation, updatePets, updateAppointments } =
    userSlice.actions;
export default userSlice.reducer;
