import { FC, ReactNode, useContext } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Grid from '@mui/material/Unstable_Grid2';

import { themeLight, themeDark } from "./themes";
import { MainContext } from "../services/contexts";


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [
        (prefixer as unknown) as any,
        (rtlPlugin as unknown) as any,
    ],
});

interface IProps {
    children?: ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {
    const { mode } = useContext(MainContext);
    const selectedTheme = mode === "dark" ? themeDark : themeLight;

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={selectedTheme}>
                <HelmetProvider>

                    <Helmet>
                        <title>کتکو</title>
                    </Helmet>

                    <Grid container height="100vh">
                        {children}
                    </Grid>

                </HelmetProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MainLayout;