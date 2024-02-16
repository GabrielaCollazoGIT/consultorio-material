import React,{useEffect} from "react";
import { useParams,Link} from "react-router-dom";
import {fetchDoctors} from '../../redux/slices/doctors/listDoctorsSlice';
import { useDispatch, useSelector } from "react-redux";
import {Box, Button, Typography,Container,List, ListItem, ListItemText, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";


const DoctorList = () => {

    const {doctors} = useSelector(state => state.doctors);
    const dispatch = useDispatch();
    const { specialityId } = useParams(); 

    useEffect(() => {

    dispatch(fetchDoctors(specialityId));

    },[dispatch, specialityId]);
console.log(doctors);



return(
    <Container  sx={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/flat-lay-health-still-life-arrangement-with-copy-space_23-2148854064.jpg?w=2000&t=st=1707451908~exp=1707452508~hmac=2980c0789a55c0ed8c1b5c889fc1abca432fca89354aa6a6c8db54f20e59335f")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%', // Ajuste para ocupar el 100% del ancho
        height: '100%', // Ajuste para ocupar el 100% de la altura
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
    <Typography variant="h4" align="center" style={{marginTop:"50px"}}>
        Nuestros Profesionales
    </Typography>

    <Grid container spacing={5} style={{marginTop:"20px"}} alignItems="center">
      {/*   {loading && <p> Loading....</p>} */}
        {doctors?.map((doctor)=>(
        <Grid item xs ={12} sm ={4} ms={4} key={`${doctor.id}-${doctor.lastname}`}>
            <Card sx={{ maxWidth: 345, margin: 'auto', padding: '10px', marginBottom: '30px' }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    image={doctor.image}
                    alt="doctor image"
                    style={{borderRadius:"5px",
                    objectFit: "contain",
                    }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {doctor.name + ' ' + doctor.lastname}
                        </Typography>
                        <List>
                        {doctor.speciality.map((speciality, index) => (
                        <ListItem key={index} sx={{ display: 'flex',textAlign: 'center', alignItems: 'center', justifyContent:'center' }}>
                        <ListItemText primary={speciality.name} />
                        </ListItem>
                        ))}
                    </List>
                    </CardContent>
                </CardActionArea>
                <Box display="flex" justifyContent="center" alignItems="center" >

                <CardActions >
                        <Link to={`/turns/${doctor._id}`}> 
                            <Button   variant="contained" size="medium">
                                Turnos Disponibles
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

export default DoctorList;