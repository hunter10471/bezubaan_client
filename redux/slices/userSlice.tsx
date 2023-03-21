import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser, IUserInitialState } from "../../interfaces/User.interface"


const initialState:IUserInitialState = {
    username:undefined,
    email:undefined,
    dateOfBirth:undefined,
    avatar:undefined,
    gender:undefined,
}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login:(state:IUserInitialState, action:PayloadAction<IUser>)=>{
            const { _id, username, avatar, email, gender } = action.payload;
            state._id = _id;
            state.username = username;
            state.avatar = avatar;
            state.email = email;
            state.gender = gender;
        },
        logout:(state:IUserInitialState)=>{
           let userDetails = Object.keys(initialState);
            userDetails.forEach(key => state[key as keyof IUserInitialState] = undefined )
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;