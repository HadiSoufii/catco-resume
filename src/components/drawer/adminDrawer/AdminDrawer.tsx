import { useContext } from 'react';

import { Drawer } from "../../../core-ui/Drawer";

import { AdminDrawerContent } from "./../";
import { AdminContext } from "../../../services/contexts";

const AdminDrawer = () => {

    const { drawerOpen } = useContext(AdminContext);

    return (
        <Drawer variant="permanent" open={drawerOpen}>
            <AdminDrawerContent />
        </Drawer>
    );
};

export default AdminDrawer;