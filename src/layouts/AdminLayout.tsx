import { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { HelmetProvider } from "react-helmet-async";
import { Box } from "@mui/material";

import { themeDark } from "./themes";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [
        (prefixer as unknown) as any,
        (rtlPlugin as unknown) as any,
    ],
});

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={themeDark}>
                <HelmetProvider>
                    <Box sx={{ display: 'flex' }}>
                        {children}
                    </Box>
                </HelmetProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default AdminLayout;