import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        token: null,
        rol:null
    },
    reducers:{
        setTokenAndRole: (state, action) => {
            const {token, rol} = action.payload;
            state.token = token;
            state.rol = rol;
        },
        clearAuth: (state) => {
            state.token = null;
            state.rol = null;
        },
    },
});

export const {setTokenAndRole, clearAuth} = authSlice.actions;

export default authSlice.reducer;