import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const specialitiesSlice = createSlice({
    name:"specialities",// nombre del slice
    initialState: {
        specialities:[],
        item: ""
        },
    

    reducers: { //
        setSpecialitiesList: (state, action) => { // esta funcion setea el estado de la app
            state.specialities = action.payload; // el payload es el tiene los datos....
        },
        getSpeciality:(state,action) => {
            state.name = action.payload;
        }
    },
});
export const {setSpecialitiesList, getSpeciality} = specialitiesSlice.actions; // exporto la action 

export default  specialitiesSlice.reducer; //

export const selectSpecialityById = (id) => (dispatch) => {  // es un thunk es la manera de modificar la logica de forma async, son funciones que devuelcen una funcion async

    const headers = {
        Authorization: "Bearer " + localStorage.getItem('token'),
    };
    
        axios.get("http://localhost:5000/api/speciality"+id, { headers })
        .then((response) => {
            console.log(response.data);
           dispatch(getSpeciality(response.data)); // el dispacher es el que ejecuta la action
        })
        .catch((error) => {
            console.error(error);
        });
    };



// recibimos el dispatch que es el que permite lanzar las accciones de modificacion de nuestro estado....
export const fetchSpecialites = () => (dispatch) => {  // es un thunk es la manera de modificar la logica de forma async, son funciones que devuelcen una funcion async

    const headers = {
        Authorization: "Bearer " + localStorage.getItem('token'),
    };
    
        axios.get("http://localhost:5000/api/speciality", { headers })
        .then((response) => {
            console.log(response.data);
           dispatch(setSpecialitiesList(response.data)); // el dispacher es el que ejecuta la action
        })
        .catch((error) => {
            console.error(error);
        });
    };
