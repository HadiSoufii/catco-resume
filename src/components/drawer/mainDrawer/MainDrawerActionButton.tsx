import { useContext } from "react";
import { Box, Fab } from '@mui/material';
import { red } from '@mui/material/colors';
import {
    MenuRounded
} from '@mui/icons-material';

import { MainContext } from "./../../../services/contexts";
const MainDrawerActionButton = () => {
    const { setDrawerOpen } = useContext(MainContext);
    return (
        <Box sx={{
            display: {
                xs: "block",
                md: "none"
            },
            position: "absolute"
        }} >
            <Fab aria-label="Sidebar" size='small' sx={{ m: 2, background: red[500] }} onClick={() => setDrawerOpen(true)} >
                <MenuRounded />
            </Fab>
        </Box>
    );
};

export default MainDrawerActionButton;