import { createSlice } from "@reduxjs/toolkit";
// cada Slice es una parte de nuestro estado...
export const doctorSlice = createSlice({
    name:"doctor",// nombre del slice
    initialState: {
        doctor:{
            name: "",
            lastname:"",
            email:"",
            nationality:"",
            dni:"",
            timing:[],
            specialities:[]
        }
    },

    reducers: {
        setDoctor: (state, action) => {
            state.doctor = action.payload;
        },
    },
});

export const {setDoctor} = doctorSlice.actions;