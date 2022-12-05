import { Divider } from '@mui/material';

import { AdminDrawerHeader, AdminDrawerMenu } from "./../";

const AdminDrawerContent = () => {
    return (
        <>
            <AdminDrawerHeader />
            <Divider />
            <AdminDrawerMenu />
        </>
    );
};

export default AdminDrawerContent;