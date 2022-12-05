import { useContext } from "react";
import { forwardRef } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, FormControl,
    InputLabel, Select, MenuItem
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { MainContext } from "../../services/contexts";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
        },
    },
};


const UserSelectionWindow = () => {
    const { openUserSelectionWindow, setOpenUserSelectionWindow, handleChangeCurrentUser, userList, currentUser } = useContext(MainContext);
    const handleClose = () => {
        setOpenUserSelectionWindow(false);
    };

    return (
        <Dialog
            open={openUserSelectionWindow}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "70%"
                }
            }}
        >
            <DialogTitle>
                رزومه کاربران تیم برنامه نویسی کتکو
            </DialogTitle>
            <DialogContent sx={{ overflowX: "hidden" }}>
                <FormControl sx={{ m: 1 }} fullWidth>
                    <InputLabel id="user-select-label">انتخاب کاربر مورد نظر</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={currentUser.id?.toString() || "0"}
                        label="انتخاب کاربر مورد نظر"
                        onChange={handleChangeCurrentUser}
                        MenuProps={MenuProps}
                    >
                        {
                            userList.map(user => (
                                <MenuItem key={user.userId} value={user.userId}>{user.userFullName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-start" }}>
                <Button onClick={handleClose}>بستن پنجره</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserSelectionWindow;