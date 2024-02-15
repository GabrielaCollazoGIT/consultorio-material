import React,{useState} from "react";
import NavListDrawer from './NavListDrawer';
import { NavLink } from "react-router-dom";
import { AppBar, Button, Drawer, IconButton, Toolbar,Box, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const NavBar =  ({navLinks}) => {
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
                        <Box sx={{display:{xs:"none", sm:"block"}}}>
                        {
                        navLinks.map(link => (
                            <Button color="inherit" key={link.title} component="a" href={link.path} >
                                {link.title}
                                </Button>
                        ))}
                        </Box>

                
                    </Toolbar>
                
                </AppBar>
            
            <Drawer open={open} anchor="left"
            onClose={() => setOpen(false)}
            sx={{display: {xs:'flex', sm:'none' } }}
            >
                <NavListDrawer navLinks={navLinks} />
            </Drawer>
            </>
    );
};
export default NavBar;