import React from 'react';
import { Box, ListItem,  ListItemText, List,Collapse, Divider,Link, ListItemButton} from '@mui/material'; 
import { Link as RouterLink } from 'react-router-dom';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const NavListDrawer = ({navLinks}) => {


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    setOpen(!open);
    };

    return  ( 
    <Box sx={{width: 250, bgcolor:'ligthsalmon'}}>
    <nav>
    <List>
        {
            navLinks.map(link => (  
        <ListItem key={link.title} disablePadding>
            <ListItemButton component="a" href={link.path}>
            <ListItemText>{link.title}</ListItemText>
            </ListItemButton>
        </ListItem>
            ))
        }
        {/* Refactorizar para hacer un droopdown...... */}
    
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

