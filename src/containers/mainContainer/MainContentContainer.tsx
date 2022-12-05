import { FC, ReactNode } from "react";
import { useTheme } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

const MainContentContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTheme();
    return (
        <Grid xs={12} sm={12} md={9} lg={9} xl={9} sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
        }}>
            {children}
        </Grid>
    );
};

export default MainContentContainer;