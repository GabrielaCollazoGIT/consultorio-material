import React,{useState} from "react";

import { AppBar, Drawer, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
export const NavBar = () => {
const [open, setOpen] = useState(false);

    return (
        <div>
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
                <NavListDrawer />
            </Drawer>
        </div>
    )
};
