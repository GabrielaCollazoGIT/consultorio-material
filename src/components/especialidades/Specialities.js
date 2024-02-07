import {Box, Button, Typography,Container, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";
import { useState,useEffect } from 'react';
const Specialities = () => {
const [especialities, setEspecialities] = useState([]);


    useEffect(() => {
    
        const fetchEspecialidades = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/speciality",{  // este fetch apunta al backend para login, mediante la ruta url
                method:'GET',
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                },
                })   
                const data = await response.json();
                setEspecialities(data); 
                console.log(data);
            } catch (error) {
                console.error("Error al cargar Especialidades:", error);
            }
        };

        
        fetchEspecialidades();
    }, []); // La de


    console.log(especialities);


        return(
            <Container>
            <Typography variant="h4" align="center" style={{marginTop:"50px"}}>
                Nuestras Especialidades
            </Typography>
        
            <Grid container spacing={5} style={{marginTop:"20px"}} alignItems="center">
              {/*   {loading && <p> Loading....</p>} */}
                {especialities?.map((speciality)=>(
                <Grid item xs ={12} sm ={4} ms={4} key={`${speciality.id}-${speciality.name}`}> 
                    <Card sx={{maxWidth: 345}} style={{padding:"10px", marginBottom:"30px"}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="200"
                            image={speciality.image}
                            alt="speciality image"
                            style={{borderRadius:"5px",
                            objectFit: "contain",
                            }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {speciality.name }
                                </Typography>
                                <Typography variant="body2"  color="text.secondary">
                                {speciality.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Box display="flex" justifyContent="center" alignItems="center" >
        
                        <CardActions      >
                            <Button /* onClick={()=>{getTurns(doctor)}} */  variant="contained" size="medium">
                                Turnos disponibles
                            </Button>
                        </CardActions>
                        </Box>
                    </Card>
                </Grid> 
                ))}
        
            </Grid>
        
        </Container>
            );

    };


export default Specialities;