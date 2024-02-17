
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate,} from "react-router-dom";
import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,
    TableRow,Typography,Paper,} from '@mui/material';
import {fetchAppoinmentsByDoctor} from '../../redux/slices/turns/appoinmentsSlice';
import { fetchSpecialites } from '../../redux/slices/specialities/listSpecialitiesSlice';
import { reserveAppointment,deleteAppointment } from '../../redux/slices/turns/appoinmentsSlice';
import {getUserData} from '../../redux/slices/auth/authSlice';

const AppointmentsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointments.appointments);
    const dni = useSelector(state => state.auth.dni);
    const specialities = useSelector(state => state.specialities.specialities );

    console.log('specialities:', specialities);


    useEffect(() => {
        dispatch(getUserData());
        
    }, [dispatch]);


    const { doctorId } = useParams(); 

    useEffect(() => {
        dispatch(fetchAppoinmentsByDoctor(doctorId));
        dispatch(fetchSpecialites());
        
        

    }, [dispatch,doctorId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };



    const handleReserve = async (id, dni) => {
    
        console.log(id);
        console.log(dni);
        
        await dispatch(reserveAppointment({ id, dni }));
        await dispatch(deleteAppointment(id));
   
        await navigate(`/turns/user/${dni}`);
    
    };


    return (
        <Box sx={{ width: '100%', margin: 'auto' }}>
            <Typography variant="h4" align="center" mt={2} mb={4}>
                Lista de Turnos Médicos Disponibles
            </Typography>
        
            <TableContainer component={Paper}>
                <Table>
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
                        <TableCell sx={{ textAlign: 'center' }}>
                            <Button
                            variant="contained"
                            color="primary"
                            disabled={appointment.reserved}
                            onClick={() => handleReserve(appointment._id,dni)}
                            sx={{ marginRight: 2, marginBottom: 1 }}
                            >
                            Reservar
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

export default AppointmentsList;
