
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [], 
    },
    reducers: {
        setAppointments: (state, action) => {
        state.appointments = action.payload;
        },
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
        },
        deleteAppointment: (state, action) => {
            const idAppointment = action.payload;
        state.appointments = state.appointments.filter(appointment => appointment.id !== idAppointment);
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


export const { setAppointments, addAppointment, deleteAppointment} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

export const fetchAppoinmentsByDoctor = (id) => (dispatch) => {
console.log(id);
    const headers = {
        Authorization: "Bearer " + localStorage.getItem('token'),
    };
    
        axios.get("http://localhost:5000/api/doctors/available/"+id, { headers })
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                dispatch(setAppointments(response.data)); // el dispacher es el que ejecuta la action
            return
            } else {
                alert(response.data.error);
            }
            
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });
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
            });
        };


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