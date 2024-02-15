// components/MedicalAppointmentsTable.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    } from '@mui/material';

    const AppointmentsList = () => {
        const [appointments, setAppointments] = useState([
            { id: 1, doctor: 'Dr. Smith', specialty: 'Cardiology', day: 'Monday', time: '9:00 AM', reserved: false },
            { id: 2, doctor: 'Dr. Johnson', specialty: 'Dermatology', day: 'Tuesday', time: '10:00 AM', reserved: false },
            { id: 3, doctor: 'Dr. Williams', specialty: 'Orthopedics', day: 'Wednesday', time: '11:00 AM', reserved: false },
            // ... add more appointments as needed
        ]);
        
        const handleReserve = (id) => {
            setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, reserved: true } : appointment
            )
            );
        };
        
        const handleCancel = (id) => {
            setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, reserved: false } : appointment
            )
            );
        };
        
        return (
            <Box sx={{ width: '100%', margin: 'auto' }}>
            <Typography variant="h4" align="center" mt={2} mb={4}>
                Lista de Turnos Médicos
            </Typography>
        
            <TableContainer component={Paper}>
                <Table >
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>Doctor</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Especialidad</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Día</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Hora</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.doctor}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.specialty}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.day}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{appointment.time}</TableCell>
                        <TableCell  sx={{ textAlign: 'center' }} >
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={appointment.reserved}
                            onClick={() => handleReserve(appointment.id)}
                            sx={{ marginRight: 2, marginBottom: 1 }}
                        >
                            Reservar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={!appointment.reserved}
                            onClick={() => handleCancel(appointment.id)}
                        >
                            Cancelar
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Box>
        );
    };
export default AppointmentsList;
