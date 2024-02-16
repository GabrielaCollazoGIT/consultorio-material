import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const doctorsSlice = createSlice({
    name:"doctors",// nombre del slice
    initialState: {
        doctors:[]
        },
    

    reducers: { //
        setDoctorList: (state, action) => { // esta funcion setea el estado de la app
            state.doctors = action.payload; // el payload es el tiene los datos....
        }
    },
});
export const {setDoctorList} = doctorsSlice.actions; // exporto la action 

export default  doctorsSlice.reducer; // 




export const fetchDoctors = (id) => (dispatch) => {

    const headers = {
        Authorization: "Bearer " + localStorage.getItem('token'),
    };
    
        axios.get("http://localhost:5000/api/doctors/speciality/"+id, { headers })
        .then((response) => {
            console.log(response.data);
           dispatch(setDoctorList(response.data)); // el dispacher es el que ejecuta la action
        })
        .catch((error) => {
            console.error(error);
        });
    };

    export const fetchAllDoctors = (id) => (dispatch) => {

        const headers = {
            Authorization: "Bearer " + localStorage.getItem('token'),
        };
        
            axios.get("http://localhost:5000/api/doctors", { headers })
            .then((response) => {
                console.log(response.data);
               dispatch(setDoctorList(response.data)); // el dispacher es el que ejecuta la action
            })
            .catch((error) => {
                console.error(error);
            });
        };
