import { Box, Divider } from "@mui/material";
import { grey } from '@mui/material/colors';

import { MainSidebarHeader, MainSidebarTabs, MainSidebarFooter } from "./";

const MainSidebarContent = () => {
    return (
        <Box sx={{ textAlign: "center", justifyContent: "center", mt: 2 }}>

            <MainSidebarHeader />

            <Divider variant='middle' color={grey[900]} sx={{ mt: 2 }} />

            <MainSidebarTabs />

            <Divider variant='middle' color={grey[900]} sx={{ mt: 2 }} />

            <MainSidebarFooter />

        </Box>
    );
};

export default MainSidebarContent;