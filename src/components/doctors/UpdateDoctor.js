import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialites } from '../../redux/slices/specialities/listSpecialitiesSlice';
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllDoctors } from "../../redux/slices/doctors/listDoctorsSlice";

////////// Actualizar por Admin/////////////
const UpdateDoctor = () => {
    const navigate = useNavigate();
    const doctorId = useParams();

    const { doctors } = useSelector(state => state.doctors);
    const { specialities } = useSelector(state => state.specialities);
    console.log(doctors);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpecialites());
        dispatch(fetchAllDoctors());
    }, [dispatch]);
    console.log(doctorId);

    const selectedDoctor = doctors.find(doctor => doctor._id === doctorId.doctorId);
    console.log(selectedDoctor);

    // Initialize state for each doctor
    const [doctorState, setDoctorState] = useState({
        email: selectedDoctor?.email || '',
        speciality: selectedDoctor?.speciality || '',
        telephone: selectedDoctor?.telephone || '',
        image: selectedDoctor?.image || ''
    });

    const { email, speciality, telephone, image } = doctorState;

    const onfinishHandler = async (e, id) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
                telephone: telephone,
                speciality: speciality,
                image: image
            }),
        };

        try {
            const response = await fetch("http://localhost:5000/api/doctors/" + id, requestOptions);

            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.error);
                throw new Error();
            } else {
                alert('Médico Actualizado correctamente');
                navigate('/doctors/admin');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
                            Actualizar Médico
                        </Typography>
                        <Box component="form" onSubmit={(e) => onfinishHandler(e, selectedDoctor._id)}>

                            <TextField
                                name="email"
                                margin="normal"
                                type="email"
                                fullWidth
                                value={email}
                                label="Email"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={(e) => setDoctorState(prevState => ({ ...prevState, email: e.target.value }))}
                            />
                            <TextField
                                name="telephone"
                                margin="normal"
                                type="text"
                                fullWidth
                                value={telephone}
                                label="Telephone"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={(e) => setDoctorState(prevState => ({ ...prevState, telephone: e.target.value }))}
                            />

                            <TextField
                                name="image"
                                margin="normal"
                                type="text"
                                fullWidth
                                value={image}
                                label="Imagen"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={(e) => setDoctorState(prevState => ({ ...prevState, image: e.target.value }))}
                            />
                            <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }}>
                                <InputLabel id="speciality">Speciality</InputLabel>
                                <Select
                                    labelId="speciality-label"
                                    id="speciality"
                                    value={speciality}
                                    label="Speciality"
                                    onChange={(e) => setDoctorState(prevState => ({ ...prevState, speciality: e.target.value }))}
                                >
                                    {specialities?.map((especialidad) => (
                                        <MenuItem key={`${especialidad.id}-${especialidad.name}`} value={especialidad._id}>
                                            {especialidad.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 1.5, mb: 3 }}
                            >
                                Actualizar
                            </Button>

                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    );
};

export default UpdateDoctor;
