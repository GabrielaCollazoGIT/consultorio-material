
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [],
        createAppointments:[]
    },
    reducers: {
        setAppointments: (state, action) => {
        state.appointments = action.payload;
        },
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
        },
        deleteAppointment: (state, action) => {
        state.appointments.pop(action.payload);
    },
    modifyAppointment: (state, action) => {
        const index = state.appointments.findIndex(x =>x.id ===action.payload.id)
        state.appointments.pop(action.payload);
        state.appointments[index] = action.payload;
        
    },


    },
    extraReducers: (builder) => {
        builder
            .addCase(reserveAppointment.fulfilled, (state, action) => {
                
                console.log('Reserva exitosa:', action.payload);
                alert('Reserva exitosa:', action.payload);
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
            
                console.log('Cancelación exitosa:', action.payload);
                alert('Cancelación exitosa:', action.payload)
            });
        },
    });


export const { setAppointments, addAppointment, deleteAppointment,modifyAppointment} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

export const fetchAppoinmentsByDoctor = (id) => async (dispatch) => {
    try {
        console.log(id);
        const headers = {
            Authorization: "Bearer " + localStorage.getItem('token'),
        };
    
        const response = await axios.get(`http://localhost:5000/api/doctors/available/${id}`, { headers });
    
        if (response.status === 200) {
            console.log(response.data);
            dispatch(setAppointments(response.data));
        } else {
            alert(response.data.error);
        }
        } catch (error) {
        console.log(error.response.data.error);
        }
    };
    export const fetchAllppoinments = () => async (dispatch) => {
        try {
        
            const headers = {
                Authorization: "Bearer " + localStorage.getItem('token'),
            };
        
            const response = await axios.get(`http://localhost:5000/api/turns`, { headers });
        
            if (response.status === 200) {
                console.log(response.data);
                dispatch(setAppointments(response.data));
            } else {
                alert(response.data.error);
            }
            } catch (error) {
            console.log(error.response.data.error);
            }
        };

    export const fetchAppoinmentsByUser = (dni) => (dispatch) => {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem('token'),
            };
        console.log(dni);
        
            axios.get(`http://localhost:5000/api/turns/patient/turns/${dni}`, { headers })
            .then((response) => {
                if (response.data) {
                console.log(response.data);
                dispatch(setAppointments(response.data));
                return;
                } else {
                alert(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
                console.error('Error en la petición:', error.message);
            
            });
        }; 

/*         export const fetchAppoinmentsByUser = createAsyncThunk('appointments/user', async ({ dni }, { dispatch }) => {
            try {
                
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:5000/api/turns/patient/turns/${dni}`,
                    
                    {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    }
                );
            
                dispatch(setAppointments(response.data));
                return;
                } catch (error) {
                console.error(error.response.data.error);
                throw error;
                }
            });
 */



    export const reserveAppointment = createAsyncThunk('appointments/reserve', async ({ id, dni }) => {
        try {
            const token = localStorage.getItem('token');
        
            const response = await axios.patch(
                `http://localhost:5000/api/turns/reserv/${id}`,
                { dni },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );
            
                return response.data;
            } catch (error) {
                console.log(error.response.data.error);
            }
            });
        
        export const cancelAppointment = createAsyncThunk('appointments/cancel', async ({  dni, hour, date }) => {
            console.log(dni);
            console.log(date);

            console.log(hour);

            try {
                const token = localStorage.getItem('token');
            
                const response = await axios.patch(
                    `http://localhost:5000/api/turns/cancel/${dni}`,
                    { date, hour },
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    }
                    );
                
                    return response.data;
                } catch (error) {
                    console.log(error.response.data.error);
                }
                });