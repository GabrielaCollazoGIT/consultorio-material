import React, {useState, useEffect} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography,
        Select, InputLabel,MenuItem,FormControl } from '@mui/material';
import { useDispatch, useSelector } from"react-redux";
import {fetchSpecialites} from '../../redux/slices/specialities/listSpecialitiesSlice';

import {useNavigate} from "react-router-dom";


const NewDoctor = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [lastname, setLastname] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [nacionality, setNacionality] = useState('');
    const [telephone, setTelephone] = useState('');
    const[image, setImage] =    useState('');
// funciona ver de refactorizar y ordenar el codigo para usar la autenticacion y autorizacion gral, usar las request de manera global tb


    const {specialities} = useSelector(state => state.specialities);
    const dispatch = useDispatch();
    
    useEffect(() => {
    
    dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes
    
    },[dispatch]);
    console.log(specialities);
    


/* 
        useEffect(() => {
            const fetchSpecialities = async () => {
                try {
                
                    const token = localStorage.getItem('token'); 
            
                    
                    const requestOptions = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    };
            
                    
                    const response = await fetch("http://localhost:5000/api/speciality", requestOptions);
                    const data = await response.json();
                    setSpecialitiesList(data);
                    console.log(data);
                } catch (error) {
                    console.error("Error al cargar las especialidades:", error);
                }
                };
            
                fetchSpecialities();
            }, []);
             */

console.log(localStorage.getItem('token'));

    const onfinishHandler = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            dni: dni,
            email: email,
            telephone: telephone,
            timing: [desde, hasta],
            nacionality: nacionality,
            speciality: speciality,
            image: image
        }),
        };
    
        try {
        const response = await fetch("http://localhost:5000/api/doctors/new", requestOptions);
    
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.error);
            throw new Error();
        } else {
            alert('Médico registrado correctamente');
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
                Registrar Nuevo Médico
                </Typography>
                <Box component="form" onSubmit={onfinishHandler}>
                <TextField
                name="userName"
                margin="normal"
                value={name}
                type="text"
                fullWidth
                label="Nombre"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {setName(e.target.value)}}
                />

                <TextField
                name="lastname"
                margin="normal"
                value={lastname}
                type="text"
                fullWidth
                label="Lastname"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {setLastname(e.target.value)}}
                />  

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
                name="dni"
                margin="normal"
                type="dni"
                fullWidth
                value={dni}
                label="Dni"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={(e)=> {setDni(e.target.value)}}
                />    
                <TextField
                name="nacionality"
                margin="normal"
                type="text"
                fullWidth
                value={nacionality}
                label="Nacionality"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={(e)=> {setNacionality(e.target.value)}}
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


                <TextField
                id="desde"
                label="Desde"
                type="time"
                
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                
                sx={{ marginRight: '20px' }} 
                />
                
                <TextField
                id="hasta"
                label="Hasta"
                type="time"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                
                />
                
                <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
                >
                Guardar
                </Button>
    
            </Box>
        </Paper>
    
        </Grid>
        </Grid>
    </Container>
);

};
export default NewDoctor;