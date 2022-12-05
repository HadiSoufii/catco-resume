import { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FavoriteRounded, CopyrightRounded } from "@mui/icons-material";

import { MainContext } from "../../services/contexts";

const MainSidebarFooter = () => {
    const { setOpenUserSelectionWindow, setDrawerOpen } = useContext(MainContext);
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 100
            }}>
            <Typography variant='subtitle2'>
                طراحی شده با {" "}
                <FavoriteRounded sx={{
                    verticalAlign: "middle",
                    color: "tomato",
                    height: 20
                }} />
                <Typography variant='caption'>
                    کپی رایت 1401 {" "}
                    <CopyrightRounded sx={{ verticalAlign: "middle", height: 16 }} />
                </Typography>
            </Typography>
            <Button variant="text" sx={{
                width: 1,
                m: 1
            }}
                onClick={() => {
                    setOpenUserSelectionWindow(true);
                    setDrawerOpen(false);
                }}
            >
                تغییر کاربر
            </Button>
        </Box>
    );
};

export default MainSidebarFooter;