import React, {useState, useEffect} from "react";
import { Box, Button,Container,Paper,Typography,
        TableBody,TableCell,TableContainer,TableHead,
        TableRow,Table} from '@mui/material';
import { useDispatch, useSelector } from"react-redux";
import {fetchSpecialites} from '../../redux/slices/specialities/listSpecialitiesSlice';
import { fetchAllppoinments,deleteAppointment } from "../../redux/slices/turns/appoinmentsSlice";
import {useNavigate} from "react-router-dom";
import { fetchDoctors } from "../../redux/slices/doctors/listDoctorsSlice";


const TurnNew = () => {
    const navigate = useNavigate();

    const [speciality] = useState('');
    



    const {specialities} = useSelector(state => state.specialities);
    const {doctors} = useSelector(state => state.doctors);
    const {appointments} = useSelector(state => state.appointments);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    console.log(appointments);

    const dispatch = useDispatch();
    
    useEffect(() => {
    
    dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes
    dispatch(fetchDoctors(speciality));
    dispatch(fetchAllppoinments());
    },[dispatch,speciality]);
    console.log(specialities);
    console.log(doctors);
    
    const handleCreate = async () => {
        
            if (localStorage.getItem("token")) {
                navigate(`/turns/turn-form/`);
            } else {
                navigate('/login');
            }
        };
    
    


    const handleUpdate = (id) => {
        if (localStorage.getItem("token")) {
            navigate(`/turns/update/${id}`);
        } else {
            navigate('/login');
        }
    };



    const handleDelete = async (e, id) => {

        e.preventDefault();
    
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'DELETE' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
    
        };
    
        try {
            const url = 'http://localhost:5000/api/turns/'+id;
            const response = await fetch(url, requestOptions);
    
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.error);
                throw new Error();
            } else {
            dispatch(deleteAppointment(id))
                alert('Turno borrado correctamente');
                navigate("/turns/new");
                console.log(responseData);
            }
        } catch (error) {
            console.log(error);
        }
    };



return (

    <>

        <Container  >

    <Box sx={{ width: '100%', margin: 'auto' }}>
    <Typography variant="h4" align="center" mt={2} mb={4}>
        Lista de Turnos
    </Typography>
    <Box>
    <Button
                variant="contained"
                color="primary"
            
                onClick={(e) => handleCreate()}
                sx={{ marginRight: 2, marginBottom: 1,}}
                >
                Agregar
                </Button>
    </Box>
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
                onClick={() => handleUpdate(appointment._id)}
                sx={{ marginRight: 2, marginBottom: 1 }}
                >
                Actualizar
                </Button>

        

                <Button
                variant="contained"
                color="primary"
                disabled={appointment.reserved}
                onClick={(e) => handleDelete(e, appointment._id)}
                sx={{ marginRight: 2, marginBottom: 1 }}
                >
                Borrar
                </Button>
            </TableCell>
            </TableRow>
        );
        })}
    </TableBody>
    </Table>
</TableContainer>
</Box>
</Container>
</>
);

};
export default TurnNew;