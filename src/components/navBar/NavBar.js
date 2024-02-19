import React,{useEffect, useState} from "react";
import NavListDrawer from './NavListDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserData } from "../../redux/slices/auth/authSlice";
import { AppBar, Button, Drawer, IconButton, Toolbar,Box, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const NavBar =  () => {

    const rol = useSelector(state => state.auth.rol );
    const dispatch = useDispatch();


    console.log(rol);
    const navUserLinks = [
        {title: "Home", path:"/"},

        {title: "Especialidades", path:"/especialidades"},

        {title: "Turnos", path:"/turns/user/:userDni"},

        {title: "Login", path:"/login"},

        {title: "Signup", path:"/signup"}
    ]
    
    const navAdminLinks = [
        {title: "Home", path:"/"},
    
        {title: "Doctor", path:"/doctors/admin"},

        {title: "Turnos", path:'/turns/new'},
        
        {title: "Login", path:"/login"},

        {title: "Signup", path:"/signup"}
        
    ]    

    const navDefaultLinks = [
        {title: "Home", path:"/"},

        {title: "Login", path:"/login"},

        {title: "Signup", path:"/signup"}
    ]

    useEffect(()=>{
        dispatch(getUserData());
    }, [dispatch]);
    
    const handleLogout = () => {
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    

    };
    const menuAcces =rol === 'USER' ? navUserLinks : rol === 'ADMIN' ? navAdminLinks : navDefaultLinks;

const [open, setOpen] = useState(false);



    return (
    <> 
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton color="inherit" size="large" onClick={() => setOpen(true)}
                        sx={{display: {xs:'flex', sm:'none' } }}
                        edge="start">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6"sx={{flexGrow:1}}>
                            
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {menuAcces.map((link) => (
                            <Button color="inherit" key={link.title} component={Link} to={link.path}>
                            {link.title}
                            </Button>
                        ))}

                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        </Box>


                    </Toolbar>
                
                </AppBar>
            
            <Drawer open={open} anchor="left"
            onClose={() => setOpen(false)}
            sx={{display: {xs:'flex', sm:'none' } }}
            >
                <NavListDrawer menuAcces={menuAcces} />
            </Drawer>
            </>
    );
};
export default NavBar;