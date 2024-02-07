import React,{useState} from "react";
import NavListDrawer from './NavListDrawer';
import { AppBar, Drawer, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const NavBar =  () => {
const [open, setOpen] = useState(false);

    return (
    <> 
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" size="large" onClick={() => setOpen(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            Consultorio
                        </Typography>
                    </Toolbar>
                </AppBar>
            
            <Drawer open={open} anchor="left"
            onClose={() => setOpen(false)}>
                <NavListDrawer/>
            </Drawer>
            </>
    );
};
export default NavBar;