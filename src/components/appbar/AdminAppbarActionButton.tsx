import { useContext } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { AdminContext } from "../../services/contexts";

const AdminDrawerActionButton = () => {

    const { drawerOpen, setDrawerOpen } = useContext(AdminContext);

    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={{
                marginRight: 5,
                ...(drawerOpen && { display: 'none' }),
            }}
        >
            <MenuIcon />
        </IconButton>
    );
};

export default AdminDrawerActionButton;