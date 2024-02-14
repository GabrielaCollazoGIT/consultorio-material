import React, {useState, useEffect} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography,
Select, InputLabel,MenuItem,FormControl } from '@mui/material';
import { useDispatch, useSelector } from"react-redux";
import {fetchSpecialites} from '../../redux/slices/specialities/listSpecialitiesSlice';
import {useNavigate} from "react-router-dom";
////////// Actualizar por Admin/////////////
const NewDoctor = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [telephone, setTelephone] = useState('');
    const[image, setImage] =    useState('');


    const {specialities} = useSelector(state => state.specialities);
    const dispatch = useDispatch();
    
    useEffect(() => {
    
    dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes
    
    },[dispatch]);
    console.log(specialities);
    


    const onfinishHandler = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        const requestOptions = {
        method: 'Patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Mover 'Authorization' fuera de requestOptions
        },
        body: JSON.stringify({
        
            email: email,
            telephone: telephone,
            speciality: speciality,
            image: image
        }),
        };
    
        try {
        const response = await fetch("http://localhost:5000/api/doctors/{}", requestOptions);
    
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.error);
            throw new Error();
        } else {
            alert('Médico Actualizado correctamente');
            navigate('/doctor');
        }
        } catch (error) {
        console.log(error);
        }
    };
    console.log(specialities);


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
                <Box component="form" onSubmit={onfinishHandler}>

            <TextField
                name="email"
                margin="normal"
                type="email"
                fullWidth
                value={email}
                label="Email"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={(e)=> {setEmail(e.target.value)}}
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
                onChange={(e)=> {setTelephone(e.target.value)}}
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
                onChange={(e)=> {setImage(e.target.value)}}
                />
                <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }}>
                <InputLabel id="speciality">Speciality</InputLabel>
                <Select
                    labelId="speciality-label"
                    id="speciality"
                    value={speciality}
                    label="Speciality"
                    onChange={(e) => setSpeciality(e.target.value)}
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
export default NewDoctor;