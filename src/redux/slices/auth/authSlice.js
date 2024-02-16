import { createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";
const authSlice = createSlice({
    name: 'auth',
    initialState:{
        token: null,
        rol:null,
        dni:null
    },
    reducers:{
        setUserInfo: (state, action) => {
            const {token, dni,rol} = action.payload;
            state.token = token;
            state.rol = rol;
            state.dni = dni;
        },
        clearAuth: (state) => {
            state.token = null;
            state.rol = null;
            state.dni = null;
        },
    },
});

export const {setUserInfo, clearAuth} = authSlice.actions;

export default authSlice.reducer;

export const getUserData = () => (dispatch) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem('token'),
    };
    
        axios.get("http://localhost:5000/api/users/info", { headers })
        .then((response) => {
            console.log(response.data);
           dispatch(setUserInfo(response.data)); // el dispacher es el que ejecuta la action
        })
        .catch((error) => {
            console.error(error);
        });
};
