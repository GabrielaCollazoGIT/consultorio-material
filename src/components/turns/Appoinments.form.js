import React, {useState, useEffect} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography,
        Select, InputLabel,MenuItem, FormControl} from '@mui/material';
import { useDispatch, useSelector } from"react-redux";
import {fetchSpecialites} from '../../redux/slices/specialities/listSpecialitiesSlice';
import { fetchAllppoinments } from "../../redux/slices/turns/appoinmentsSlice";
import {useNavigate} from "react-router-dom";
import { fetchDoctors } from "../../redux/slices/doctors/listDoctorsSlice";

const AppoinmentForm = () => {
    const navigate = useNavigate();
    
    const [doctor, setDoctor] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [date, setDate] = useState('');
    
    const [hour, setHour] = useState('');



    const {specialities} = useSelector(state => state.specialities);
    const {doctors} = useSelector(state => state.doctors);
    const {appointments} = useSelector(state => state.appointments);



    console.log(appointments);

    const dispatch = useDispatch();
    
    useEffect(() => {
    
    dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes
    dispatch(fetchDoctors(speciality));
    dispatch(fetchAllppoinments());
    },[dispatch,speciality]);
    console.log(specialities);
    console.log(doctors);
    
 
    
    
    const handleButtonClick = async (e) => {
        onfinishHandler(e);

        await dispatch(fetchAllppoinments());
        navigate(`/turns/new/`);
    };
console.log(localStorage.getItem('token'));

    const onfinishHandler = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                date,
                hour,
                speciality,
                doctor,
            }),
        };
    
        try {
            const url = 'http://localhost:5000/api/turns/new'
            const response = await fetch(url, requestOptions);
    
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.error);
                throw new Error();
            } else {
            
                alert('Turno registrado correctamente');
            
            }
        } catch (error) {
            console.log(error);
        }
    };
    

return(

    <Container  className="body-background">
    <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: "100vh" }}
    className= "login template d-flex justify-content-center align-items-center vh-100"
    >
        <Grid item >
        <Paper sx={{ padding: "1.2em",border:"solid", borderRadius: "0.5em" ,background:"transparent"}}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
            Registro Nuevo Turno
            </Typography>
            <Box component="form" >
        
            <FormControl fullWidth sx={{ mt: 2, mb: 1.5 }}>
            <InputLabel id="speciality">Speciality</InputLabel>
            <Select
                labelId="speciality-label"
                id="speciality"
                value={speciality}
            
                label="Speciality"
                onChange={(e) => {
                    setSpeciality(e.target.value);
                    dispatch(fetchDoctors(e.target.value));
                }}
            >
                {specialities?.map((especialidad) => (
                <MenuItem key={`${especialidad.id}-${especialidad.name}`} value={especialidad._id}>
                {especialidad.name}
                </MenuItem>
                ))}
            </Select>
            </FormControl>


            <FormControl fullWidth sx={{ mt: 2, mb: 1.5 }}>
            <InputLabel id="doctor">Doctor</InputLabel>
            <Select
                labelId="doctor-label"
                id="doctor"
                value={doctor}
                label="Doctor"
                onChange={(e) => setDoctor(e.target.value)}
            >
                {doctors?.map((doctor) => (
                <MenuItem key={`${doctor.id}-${doctor.name}`} value={doctor._id}>
                {doctor.name}  {doctor.lastname}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            <TextField
            name="datePick"
            margin="normal"
            value={date}
            type="date"
            fullWidth
            label="Fecha"
            
            sx={{ mt: 1.5, mb: 1.5 }}
            required
            onChange={(e)=> {setDate(e.target.value)}}
            />

            <TextField
            id="hour"
            label="Time"
            type="time"
            sx={{ mt: 1.5, mb: 1.5 }}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            
            />



            <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 1.5, mb: 3 }}
            onClick={handleButtonClick}
            
            >
            Registrar Turno
            </Button>
            
        </Box>
    </Paper>
    

    </Grid>
</Grid>
</Container>

);
};
export default AppoinmentForm;