import { useContext } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { AdminContext } from "../../../services/contexts";

const AdminDrawerHeader = () => {
    const theme = useTheme();
    const { setDrawerOpen } = useContext(AdminContext);
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' >کتکو</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default AdminDrawerHeader;