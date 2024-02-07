import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';

export const store = configureStore({ // metodo ConfigureStore al que le paso un objeto
    reducer:{
        user: userReducer, // estos serian los Slice, puedo tener varios
    },
});