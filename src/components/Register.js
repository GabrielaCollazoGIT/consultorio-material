import React, { useState } from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography} from '@mui/material';

import {Link, useNavigate} from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');





const onfinishHandler = async (e) =>{
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:5000/api/users/signup",{  // este fetch apunta al backend para login, mediante la ruta url
        method:'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({  // me convierte estos datos a Json
            userName: name, // extraemos esa info del input del form
            dni:dni,
            email:email,
            password:password        // mando estos atributos porq son los que espera recibir el Backend...
        }), // si esta tdo bien lo valida el botton submit
        })
        const responseData = await response.json();
        if(!response.ok){// statuscode
            alert(responseData.error);
        throw new Error(); // eo c0digo que sigue no se ejecuta  y se dispara el catch
        }else{
            alert('Registrado Correctamente, por favor inicia sesion') // eo c0digo que sigue no se ejecuta  y se dispara el catch
            navigate('/login');
        }
    
        
        } catch (error) {
        console.log(error);
        }
}


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
                Registrarse
                </Typography>
                <Box component="form" onSubmit={onfinishHandler}>
                <TextField
                name="userName"
                margin="normal"
                value={name}
                type="text"
                fullWidth
                label="User Name"
                
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={(e)=> {setName(e.target.value)}}
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
                name="password"
                margin="normal"
                type="password"
                fullWidth
                value={password}

                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={(e)=> {setPassword(e.target.value)}}
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
                <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
                >
                Guardar
                </Button>
            

                <Typography>
                Return to <Link to="/login"
                        >Login</Link>
                </Typography>
            </Box>
        </Paper>
        

        </Grid>
      </Grid>
    </Container>
  );

};

export default Register;