import { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import { Box, useTheme } from '@mui/material';

const AdminContentContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const theme = useTheme();

    return (
        <Box component="main" sx={{ flexGrow: 1, p: (location.pathname.toLowerCase() === "/admin/login") ? 0 : 3, height: "100vh" }}>
            {
                !(location.pathname.toLowerCase() === "/admin/login") &&
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                }} />
            }
            {children}
        </Box>
    );
};

export default AdminContentContainer;