
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,} from "react-router-dom";
import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,
    TableRow,Typography,Paper,} from '@mui/material';
import { fetchSpecialites } from "../../redux/slices/specialities/listSpecialitiesSlice"
import { fetchAllDoctors } from '../../redux/slices/doctors/listDoctorsSlice';


const DoctorAdmins = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors.doctors);
    

    const specialities = useSelector(state => state.specialities.specialities );
    console.log(doctors);
    console.log('specialities:', specialities);

    useEffect(() => {
    const dataAync = async () =>{
        await   dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes
        await dispatch(fetchAllDoctors());
    }
        dataAync();

        },[dispatch]);
        console.log(specialities);
        console.log(doctors);


    const handleCreate= async () => {

        await navigate(`/doctors/new`);
    
    };


    const handleUpdate= async (id) => {
    
        console.log(id);

        await navigate(`/doctors/update/${id}`);
    
    };


    return (
        <Box sx={{ width: '100%', margin: 'auto' }}>
            <Typography variant="h4" align="center" mt={2} mb={4}>
                Lista de Médicos 
            </Typography>
            <Box>
            <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleCreate()}
                            sx={{ marginRight: 2, marginBottom: 1 }}
                            >
                            Add Doctor
                            </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>Nombre y Apellido</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Especialidad</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Nacionalidad</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Telefono</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.map((doctor, index) => {
                    const speciality = specialities.find((s) => s.name === doctor.speciality[0].name);
                    
                    console.log(doctor.speciality[0]);
                    return (
                        <TableRow key={doctor.id + '' + index}>
                        <TableCell sx={{ textAlign: 'center' }}>
                            {doctor.name + ' ' + doctor.lastname}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            { speciality.name }
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{doctor.nacionality}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{doctor.telephone}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{doctor.email}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(doctor._id)}
                            sx={{ marginRight: 2, marginBottom: 1 }}
                            >
                            Modificar
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

export default DoctorAdmins;
