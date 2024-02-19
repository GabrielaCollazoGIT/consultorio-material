
import React, {useState} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography} from '@mui/material';
import { Link, useNavigate} from "react-router-dom";

import axios from "axios";




const ChangePassword = () => {

    const navigate = useNavigate();
    const [newPassword, SetNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetToken = localStorage.getItem("token");
    console.log(resetToken);

    const onfinishHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                "http://localhost:5000/api/users/new-password",
                {
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        reset: resetToken,
                    },
                }
            );
    
            console.log(response.data);
    
            if (response.data) {
                console.log(response.data);
                navigate('/login');
            }
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.error);
        }
    };


console.log(newPassword);
console.log(confirmPassword);


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
                Cambiar contraseña
                </Typography>
                <Box component="form" >
                <TextField
                name="password"
                margin="normal"
                type="text"
                fullWidth
                label="Password"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {SetNewPassword(e.target.value)}}
                />
            <TextField
                name="confirmPassword"
                margin="normal"
                type="text"
                fullWidth
                label="Confirm Password"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {setConfirmPassword(e.target.value)}}
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
                Return Home <Link to='/' className="ms-2">Inicio</Link>
                </Typography>

            </Box>
        </Paper>
        

        </Grid>
    </Grid>
    </Container>
    );
};
export default ChangePassword;