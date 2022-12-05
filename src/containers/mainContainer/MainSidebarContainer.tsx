import { FC, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const MainSidebarContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Grid xs={0} sm={0} md={3} lg={3} xl={3}
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                color: 'text.primary',
                zIndex: 1000,
                boxShadow: (theme) => `+4px 0px 10px 0px ${theme.palette.text.primary}`,
                height: "100vh", overflowY: "auto", overflowX: "hidden"
            }}>
            {children}
        </Grid>
    );
};

export default MainSidebarContainer;