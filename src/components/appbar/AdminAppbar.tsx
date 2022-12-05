import { useContext } from 'react';
import { Toolbar } from '@mui/material';

import AdminAppbarContent from "./AdminAppbarContent";

import { AppBar } from "../../core-ui/Appbar";
import { AdminContext } from "../../services/contexts";


const AdminAppbar = () => {

    const { drawerOpen } = useContext(AdminContext);

    return (
        <AppBar position="fixed" open={drawerOpen}>
            <Toolbar>
                <AdminAppbarContent />
            </Toolbar>
        </AppBar>
    );
};

export default AdminAppbar;