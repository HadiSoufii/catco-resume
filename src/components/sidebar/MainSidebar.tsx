import React from 'react';

import { MainSidebarDrawer } from '../drawer/mainDrawer';
import { MainSidebarContent } from './';

const MainSidebar = () => {
    return (
        <>
            <MainSidebarContent />
            <MainSidebarDrawer />
        </>
    );
};

export default MainSidebar;