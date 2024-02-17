
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,
    TableRow,Typography,Paper,} from '@mui/material';
import {fetchAppoinmentsByUser} from '../../redux/slices/turns/appoinmentsSlice';
import { cancelAppointment, deleteAppointment } from '../../redux/slices/turns/appoinmentsSlice';
import {getUserData} from '../../redux/slices/auth/authSlice';
import { fetchSpecialites } from '../../redux/slices/specialities/listSpecialitiesSlice';

const UserAppointments = () => {

    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointments.appointments);
    const dni = useSelector(state => state.auth.dni);
    const specialities = useSelector(state => state.specialities.specialities );

    console.log(appointments);


    useEffect(() => {
        dispatch(getUserData());
        
    }, [dispatch]); 




    useEffect(() => {
        dispatch(fetchSpecialites());
        dispatch(fetchAppoinmentsByUser(dni));


    }, [dispatch,dni]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };



    const handleCancel = async (dni, date, hour, id) => {
        try {
            await dispatch(cancelAppointment({ dni, date, hour }));
            await dispatch(deleteAppointment(id));
            await dispatch(fetchAppoinmentsByUser(dni));
        } catch (error) {
            console.error('Error en handleCancel:', error);
        }
    };
    return (
        <Box sx={{ width: '100%', margin: 'auto' }}>
        <Typography variant="h4" align="center" mt={2} mb={4}>
            Lista de Turnos del Usuario
        </Typography>

        <TableContainer component={Paper}>
                <Table >
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>Doctor</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Especialidad</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Día</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Hora</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Estado</TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment, index) => {
                    const speciality = specialities.find((s) => s._id === appointment.speciality);
                    console.log(appointment.doctor.name);
                    return (
                        <TableRow key={appointment.id + '' + index}>
                        <TableCell sx={{ textAlign: 'center' }}>
                            {appointment.doctor.name + ' ' + appointment.doctor.lastname}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            { speciality.name }
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{formatDate(appointment.date)}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.hour}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.status}</TableCell>
                        <TableCell  sx={{ textAlign: 'center' }} >
                    
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={appointment.reserved}
                            onClick={() => handleCancel(dni, appointment.date, appointment.hour, appointment.id)}
                            >
                            Cancelar
                        </Button>
                        </TableCell>
                    </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default UserAppointments;