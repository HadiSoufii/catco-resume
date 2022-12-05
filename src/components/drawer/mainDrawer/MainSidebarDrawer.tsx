import { useContext } from "react";
import { Drawer } from '@mui/material';

import { MainContext } from "./../../../services/contexts";
import { MainSidebarContent } from "./../../sidebar/"

const MainSidebarDrawer = () => {
    const { drawerOpen, setDrawerOpen } = useContext(MainContext);

    return (
        <Drawer
            open={drawerOpen}
            variant="temporary"
            onClose={() => setDrawerOpen(false)}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 300,
                    backgroundImage: "none"
                },
                display: {
                    xs: "block",
                    md: "none"
                },
            }}
        >
            <MainSidebarContent />
        </Drawer>
    );
};

export default MainSidebarDrawer;