import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",// nombre del slice
    initialState: {
        user:null
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;