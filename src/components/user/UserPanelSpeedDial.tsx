import { Link } from 'react-router-dom';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import {
    Edit as EditIcon,
    AccountBox as AccountBoxIcon,
    ContactPhone as ContactPhoneIcon,
    ContactPage as ContactPageIcon,
    ContactEmergency as ContactEmergencyIcon,
    DatasetLinked as DatasetLinkedIcon,
    VpnKey as VpnKeyIcon,
} from '@mui/icons-material';

const actions = [
    {
        icon: <Link to="/admin/userpanel/editaccount" style={{ display: "flex", color: "black" }}><AccountBoxIcon /></Link>,
        name: 'ویرایش حساب'
    },
    {
        icon: <Link to="/admin/userpanel/contactinformation" style={{ display: "flex", color: "black" }}><ContactPhoneIcon /></Link>,
        name: 'ویرایش اطلاعات تماس'
    },
    {
        icon: <Link to="/admin/userpanel/personalinformation" style={{ display: "flex", color: "black" }}><ContactPageIcon /></Link>,
        name: 'ویرایش اطلاعات فردی'
    },
    {
        icon: <Link to="/admin/userpanel/jobinformation" style={{ display: "flex", color: "black" }}><ContactEmergencyIcon /></Link>,
        name: 'ویرایش اطلاعات شغلی'
    },
    {
        icon: <Link to="/admin/userpanel/linksinformation" style={{ display: "flex", color: "black" }}><DatasetLinkedIcon /></Link>,
        name: 'ویرایش لینک ها'
    },
    {
        icon: <Link to="/admin/userpanel/editpassword" style={{ display: "flex", color: "black" }}><VpnKeyIcon /></Link>,
        name: 'ویرایش کلمه عبور'
    },

];

const UserPanelSpeedDial = () => {
    return (
        <Box sx={{ position: "fixed", right: 0, height: "100%", transform: 'translateZ(0px)', flexGrow: 1, zIndex: 10000 }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{
                    position: 'absolute', bottom: 100, right: 30,
                    ".muirtl-z5ylt0-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab": {
                        backgroundColor: "secondary.dark",
                        "&:hover": {
                            backgroundColor: "secondary.main"
                        }
                    }
                }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                direction="up"
                transitionDuration={2000}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        sx={{
                            backgroundColor: "secondary.main"
                        }}
                    />

                ))}
            </SpeedDial>
        </Box>
    );
};

export default UserPanelSpeedDial;
