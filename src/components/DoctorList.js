import React from "react";
import { useState,useEffect } from 'react';
import { Button, Typography,Container, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";


const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
    
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/doctors",{  // este fetch apunta al backend para login, mediante la ruta url
                method:'GET',
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                },
                })   
                const data = await response.json();
                setDoctors(data); 
                console.log(data);
            } catch (error) {
                console.error("Error al cargar Doctores:", error);
            }
        };

        
        fetchDoctors();
    }, []); // La de


    console.log(doctors);

return(
    <Container>
    <Typography variant="h4" align="center" style={{marginTop:"50px"}}>
        Lista de Productos
    </Typography>
    <Grid container spacing={5} style={{marginTop:"20px"}}>
        {loading && <p> Loading....</p>}
        {doctors?.map((doctor)=>(
        <Grid item xs ={12} sm ={4} ms={4} key={doctor.id}> 
            <Card sx={{maxWidth: 345}} style={{padding:"10px", marginBottom:"30px"}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={doctor.image}
                    alt="doctor image"
                    style={{borderRadius:"5px"}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {doctor.name + ' ' + doctor.lastname}
                        </Typography>
                        <Typography variant="body2"  color="text.secondary">
                        {product.specialities}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={()=>{getTurns(doctor)}} variant="contained" size="medium">
                        Turnos disponibles
                    </Button>
                </CardActions>
            </Card>
        </Grid> 
        ))}

    </Grid>

</Container>
    );
};

export default DoctorList;