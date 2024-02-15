import React, { useEffect } from 'react';
import { useDispatch, useSelector } from"react-redux";
import {fetchSpecialites} from '../../redux/slices/specialities/listSpecialitiesSlice';
import {Box, Button, Typography,Container, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";
import { Link} from "react-router-dom";


const Specialities = () => {


const {specialities} = useSelector(state => state.specialities);
const dispatch = useDispatch();

useEffect(() => {

dispatch(fetchSpecialites());// necesitamos el thunk para caragarlo la momenot de entrar a la pag especialidaddes

},[dispatch]);
console.log(specialities);






/*     useEffect(() => {
    
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
 */

    console.log(specialities);


        return(
            <Container
            
            >
            <Typography variant="h4" align="center" style={{marginTop:"50px"}}>
                Nuestras Especialidades
            </Typography>
        
            <Grid container spacing={5} style={{marginTop:"20px"}} alignItems="center">
              {/*   {loading && <p> Loading....</p>} */}
                {specialities?.map((speciality)=>(
                <Grid item xs ={12} sm ={4} ms={4} key={`${speciality.id}-${speciality.name}`}> 
            <Card sx={{ maxWidth: 345, margin: 'auto', padding: '10px', marginBottom: '30px' }}>
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
        
                        <CardActions >
                        <Link to={`/doctor/${speciality._id}`}> 
                            <Button   variant="contained" size="medium">
                                Médicos Disponibles
                            </Button>
                        </Link> 
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