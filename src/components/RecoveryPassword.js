
import React, {useState} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography} from '@mui/material';
import { Link, useNavigate} from "react-router-dom";
import { setUserInfo } from "../redux/slices/auth/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";


const RecoveryPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');




const onfinishHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/users/forgot-password", { email });

        if (response.data) {
            const url = response.data.link;
            console.log(response.data);
            console.log(url);
            
            const lastSlashIndex = url.lastIndexOf("/");
            
        
            const token = url.substring(lastSlashIndex + 1);
            
            console.log(token);
    
            localStorage.setItem("token",token);
            dispatch(setUserInfo(token));
            console.log(token);
            } else {
            console.error('Link is undefined or does not match the pattern');
            }

            navigate('/password-change');
            alert("Por favor verifique su correo y siga el enlace que le acabamos de enviar..");
        

        } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.error);
        }
    };

    const dispatch = useDispatch();





return (
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
                Recuperar contraseña
                </Typography>
                <Box component="form" >
                <TextField
                name="email"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {setEmail(e.target.value)}}
                />
            

                <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
                onClick={onfinishHandler}
                >
                Enviar
                </Button>
                <Typography>
                Return Login  <Link to='/login' className="ms-2">Iniciar Sesión</Link>
                </Typography>

            </Box>
        </Paper>
        

        </Grid>
    </Grid>
    </Container>
    );
};
export default RecoveryPassword;