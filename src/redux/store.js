import { configureStore } from "@reduxjs/toolkit";
//import userReducer from './reducers/userSlice';
import { userSlice } from "./slices/users/userSlice2";
import doctors from './slices/doctors/listDoctorsSlice';
import specialities from './slices/specialities/listSpecialitiesSlice';
import auth from './slices/auth/authSlice';
export const store = configureStore({ // metodo ConfigureStore al que le paso un objeto
    reducer:{
        user: userSlice.reducer, // estos serian los Slice, puedo tener varios
        doctors,
        specialities,
        auth

    },
});