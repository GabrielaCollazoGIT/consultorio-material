
import React, {useState} from "react";
import { Box, Button,Container,Grid,Paper,TextField,Typography} from '@mui/material';
import { Link, useNavigate} from "react-router-dom";

import axios from "axios";


const LoginOp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const onfinishHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/users/login",{email, password});
        const {token } = response.data;
        console.log(response.data);

        if(response.data){// statuscode
            //dispatch(setTokenAndRole({token, rol}));

            localStorage.setItem("token", token)
        alert('Ingresando.....');

        navigate('/');
        }
        
    } catch(error) {

        alert(error.response.data.error);

    }
}


console.log(email, password);


/* const onfinishHandler = async (e) =>{
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:5000/api/users/login",{  // este fetch apunta al backend para login, mediante la ruta url
        method:'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({  // me convierte estos datos a Json
        
            email:email,
            password:password        // mando estos atributos porq son los que espera recibir el Backend...
        }), // si esta tdo bien lo valida el botton submit
        })
        const responseData = await response.json();
        if(response.ok){// statuscode
            dispatch(addUser(responseData));
            localStorage.setItem("token", responseData.token)
        alert('Ingresando.....') // eo c0digo que sigue no se ejecuta  y se dispara el catch
        navigate('/');
        }
        else{
            alert(responseData.error);
        }
    
        } catch (error) {
        console.log(error);
        }
} */

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
                Iniciar sesion
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
            <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
            
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={(e)=> {setPassword(e.target.value)}} />

                <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
                onClick={onfinishHandler}
                >
                Iniciar sesion
                </Button>
                <Typography>
                Forgot  <Link to='/password-recovery' className="ms-2">Password</Link>
                </Typography>

                <Typography>
                Do you have an acount? <Link to='/signup' className="ms-2">Registrarse</Link>
                </Typography>
            </Box>
        </Paper>
        

        </Grid>
    </Grid>
    </Container>
    );
};
export default LoginOp;