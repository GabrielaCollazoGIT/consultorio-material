import React, {useState, useEffect} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography,
        Select, InputLabel,MenuItem, FormControl} from '@mui/material';
import { useDispatch, useSelector } from"react-redux";
import { fetchAllppoinments ,modifyAppointment} from "../../redux/slices/turns/appoinmentsSlice";
import {useNavigate, useParams} from "react-router-dom";
import { fetchDoctors } from "../../redux/slices/doctors/listDoctorsSlice";


const UpdateTurn = () => {
    const navigate = useNavigate();
    

    const {id} = useParams();


    const {specialities} = useSelector(state => state.specialities);
    const {doctors} = useSelector(state => state.doctors);
    const {appointments} = useSelector(state => state.appointments);
    const appoinment = appointments.find(a => a._id === id); 
    console.log(appoinment)

    const doctorFind = doctors.find(d => d.id  ===  appoinment.doctor._id); 

    console.log(doctorFind);


    console.log(appointments);
    const [doctor, setDoctor] = useState("");
    const [speciality, setSpeciality] = useState(appoinment.speciality);
    const [date, setDate] = useState(appoinment.date);
    
    const [hour, setHour] = useState(appoinment.hour);

    const dispatch = useDispatch();
    
    useEffect(() => {
    dispatch(fetchDoctors(speciality));
    dispatch(fetchAllppoinments());
    },[dispatch,speciality]);
    console.log(specialities);
    console.log(doctors);
    
    const handleUpdate = async () => {
    
        await dispatch(fetchAllppoinments());
    };
    
    const handleButtonClick = async (e) => {
        onfinishHandler(e);
        await handleUpdate();
    };
console.log(localStorage.getItem('token'));

    const onfinishHandler = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PATCH' ,
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
            const url = 'http://localhost:5000/api/turns/'+id;
            const response = await fetch(url, requestOptions);
    
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.error);
                throw new Error();
            } else {
                dispatch(modifyAppointment(responseData));
                alert('Turno Actualizado correctamente');
                navigate("/turns/new");
            
            }
        } catch (error) {
            console.log(error);
        }
    };
    




return (

    <>

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
                Actualizar Turno
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
                Actualizar Turno
                </Button>
                
            </Box>
        </Paper>
        

        </Grid>
    </Grid>
    </Container>

</>
);

};
export default UpdateTurn;