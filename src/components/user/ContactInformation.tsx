import { FC } from "react";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { TextField } from '@mui/material';
import { IContact } from '../../interfaces';

interface IProps {
    contactInformation: IContact,
}

const ContactInformation: FC<IProps> = ({ contactInformation }) => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={contactInformation.email}
                    label="ایمیل"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={contactInformation.mobile !== "" ? contactInformation.mobile : "شماره موبایل ثبت نشده است"}
                    label="شماره موبایل"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                    dir={contactInformation.mobile !== "" ? "ltr" : "rtl"}
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    multiline
                    defaultValue={contactInformation.address}
                    label="آدرس"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
        </Grid>
    );
};

export default ContactInformation;