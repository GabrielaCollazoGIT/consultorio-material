
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate,} from "react-router-dom";
import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,
    TableRow,Typography,Paper,TextField,Grid,} from '@mui/material';
import {fetchAppoinmentsCancelled} from '../../redux/slices/turns/appoinmentsSlice';
import { fetchSpecialites } from '../../redux/slices/specialities/listSpecialitiesSlice';
import {getUserData} from '../../redux/slices/auth/authSlice';

const CancelledAppoimnets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointments.appointments);
    const [dni, setDni] = useState("");            
    const specialities = useSelector(state => state.specialities.specialities );

    console.log('specialities:', specialities);
    console.log('appoiments:', appointments);

    useEffect(() => {
        dispatch(getUserData());
        
    }, [dispatch]);




    useEffect(() => {
        dispatch(fetchAppoinmentsCancelled(dni));
        dispatch(fetchSpecialites());
        
        

    }, [dispatch,dni]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };



    const handleReturn = async () => {
    navigate("/");
    
    };


    return (
        <Box sx={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h4" align="center" mt={2} mb={4}>
                Lista de Turnos Médicos Cancelados Por el Usuario
            </Typography>
    
            <Grid item>
                <Paper sx={{ padding: '1.2em', border: 'solid', borderRadius: '0.5em', background: 'transparent' }}>
                    <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
                        Ingrese el Dni
                    </Typography>
                    <Box component="form">
                        <TextField
                            name="dni"
                            margin="normal"
                            type="text"
                            fullWidth
                            label="Dni"
                            sx={{ mt: 2, mb: 1 }}
                            required
                            onChange={(e) => {
                                setDni(e.target.value);
                            }}
                        />
                    </Box>
                </Paper>
            </Grid>
    
            <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center' }}>Doctor</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Especialidad</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Dia de Cancelación</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Hora del Turno</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Estado</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment, index) => {
                            const speciality = specialities.find((s) => s._id === appointment.speciality);
    
                            return (
                                <TableRow key={appointment.id + '' + index}>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {appointment.doctor}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{speciality.name}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{formatDate(appointment.updatedAt)}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{appointment.hour}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{appointment.status}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleReturn()}
                                            sx={{ marginBottom: 1 }}
                                        >
                                            Volver a Inicio
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

export default CancelledAppoimnets;
