
import { createSlice } from '@reduxjs/toolkit';

export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        list: [], 
    },
    reducers: {
        setAppointments: (state, action) => {
        state.list = action.payload;
        },
        reserveAppointment: (state, action) => {
        const { id } = action.payload;
        state.list = state.list.map((appointment) =>
            appointment.id === id ? { ...appointment, reserved: true } : appointment
        );
        },
        cancelAppointment: (state, action) => {
        const { id } = action.payload;
        state.list = state.list.map((appointment) =>
            appointment.id === id ? { ...appointment, reserved: false } : appointment
        );
        },
    },
});

export const { setAppointments, reserveAppointment, cancelAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
