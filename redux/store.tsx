import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from './slices/userSlice';

const middleware = applyMiddleware(thunk);
export const store = configureStore({
    reducer:{ user: userReducer}
})