import { useContext } from "react";
import { Tabs, Tab } from "@mui/material";

import { MainContext } from "./../../services/contexts";

import { tabsData } from "../../helpers/data/tabsData.sidebar";

const MainSidebarTabs = () => {
    const { pageNumber, handlePageNumber, setDrawerOpen } = useContext(MainContext);

    const data = tabsData();

    return (
        <Tabs
            orientation='vertical'
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            aria-label="icon label tabs example"
            value={pageNumber}
            onChange={handlePageNumber}
        >
            {
                data.map((tab, index) => (
                    <Tab
                        id={tab.id}
                        aria-controls={tab["aria-controls"]}
                        key={index}
                        label={tab.label}
                        icon={<tab.icon />}
                        iconPosition='start'
                        sx={{
                            "&.MuiTab-root": {
                                borderRadius: 2,
                                minHeight: 50,
                                my: .5,
                                mx: 1,
                            }
                        }}
                        onClick={() => setDrawerOpen(false)}
                    />
                ))
            }

        </Tabs>
    );
};

export default MainSidebarTabs;