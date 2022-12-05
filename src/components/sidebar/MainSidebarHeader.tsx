import { useContext } from 'react';
import { Typography, Switch } from '@mui/material';

import { MainContext } from '../../services/contexts';

const MainSidebarHeader = () => {
    const { mode, setMode } = useContext(MainContext);

    return (
        <>
            <Typography variant='h6'>
                تیم برنامه نویسی کتکو
            </Typography>

            <Typography variant='caption'>
                دانشگاه علمی کاربردی، جهاد دانشگاهی مشهد
            </Typography>
            <Switch
                sx={{ display: "flex", margin: "auto" }}
                checked={mode === "dark"}
                onChange={() => setMode(mode === "dark" ? "light" : "dark")}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </>
    );
};

export default MainSidebarHeader;