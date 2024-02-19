import React from 'react';
import { Box, ListItem,  ListItemText, List,Collapse,Link, ListItemButton} from '@mui/material'; 
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const NavListDrawer = ({menuAcces}) => {


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    setOpen(!open);
    };

    return  ( 
    <Box sx={{width: 250, bgcolor:'ligthsalmon'}}>
    <nav>
    <List>
        {
            menuAcces.map(link => (  
        <ListItem key={link.title} disablePadding>
            <ListItemButton component="a" href={link.path}>
            <ListItemText>{link.title}</ListItemText>
            </ListItemButton>
        </ListItem>
            ))
        }

    
        <ListItem button onClick={handleClick}>
        <ListItemText primary="Profesionales" />
        {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem button component={Link} to="doctor/new">
            <ListItemText primary="Agregar" />
            </ListItem>
            <ListItem button component={Link} to="doctor/update">
            <ListItemText primary="Actualizar" />
            </ListItem>
        </List>
        </Collapse>
    </List>
</nav>
        </Box>
        );
    }







export default NavListDrawer;

