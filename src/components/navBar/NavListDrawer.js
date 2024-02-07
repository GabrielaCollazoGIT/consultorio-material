import React from 'react';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, List, Divider } from '@mui/material'; 
import InboxIcon from '@mui/icons-material/Inbox'

const NavListDrawer = () => {
return  ( <Box sx={{width: 250, bgcolor:'ligthsalmon'}}>
        <nav>
            <List>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>

                <ListItem disablePadding>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>

                <ListItem disablePadding>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>

            </List>
        </nav>
        <Divider/>
        <nav>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText>Ver a donde va el</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    </Box>
    );
}
export default NavListDrawer;

