import { useContext, useState, MouseEvent } from "react";
import { Typography, Avatar, Box, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";

import { AdminContext } from "../../services/contexts";
import Catco from "../../assets/images/LogoCatco.jpg";

const AdminAppbarUserInformation = () => {
    const { userLocalStorage } = useContext(AdminContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {
                userLocalStorage !== undefined ?
                    <>
                        <Box sx={{ flexGrow: 0, mr: 1 }}>
                            <Tooltip title="منو">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={userLocalStorage.userName}
                                        src={userLocalStorage.avatar} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" color="red">
                                        <Link to="/admin/logout" style={{ textDecoration: "none", color: "inherit" }}>خروج از حساب</Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Typography variant="h6" noWrap component="div">
                            {userLocalStorage.fullName}
                        </Typography>
                        <Avatar alt="Logo"
                            src={Catco}
                            sx={{
                                "&.MuiAvatar-root": {
                                    position: "absolute",
                                    right: "20px",
                                    height: "auto",
                                    width: "120px",
                                    borderRadius: 0,
                                }
                            }}
                        />
                    </>
                    : <></>
            }
        </>
    );
};

export default AdminAppbarUserInformation;