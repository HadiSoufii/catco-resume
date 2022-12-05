import { FC } from "react";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { TextField } from '@mui/material';
import { IPersonal } from "../../interfaces";
import jMoment from "moment-jalaali";

interface IProps {
    personalInformation: IPersonal,
}

const PersonalInformation: FC<IProps> = ({ personalInformation }) => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={jMoment(personalInformation.birthDay).format('jYYYY/jM/jD')}
                    label="تاریخ تولد"
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
                    defaultValue={personalInformation.maritalStatus}
                    label="وضعیت تاهل"
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
                    defaultValue={personalInformation.gender}
                    label="جنسیت"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={personalInformation.serviceStatus}
                    label="وضعیت سربازی"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
        </Grid>
    );
};

export default PersonalInformation;