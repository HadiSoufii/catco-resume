import { FC } from "react";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { InputLabel, Select, TextField, Chip, Box } from '@mui/material';
import { IJob } from '../../interfaces';

interface IProps {
    jobInformation: IJob,
}

const JobInformation: FC<IProps> = ({ jobInformation }) => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={jobInformation.EmploymentStatus}
                    label="وضعیت اشتغال"
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
                    defaultValue={jobInformation.JobType}
                    label="نوع شغل مورد نظر"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                />
            </Grid>
            <Grid xs={12}>
                <InputLabel id="employmentCities-label">شهرهایی که در آن امکان کار دارم</InputLabel>
                <Select
                    fullWidth
                    multiple
                    variant='standard'
                    labelId="employmentCities-label"
                    label="شهرهایی که در آن امکان کار دارم"
                    defaultValue={jobInformation.EmploymentCities}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    inputProps={
                        { disabled: true, }
                    }
                    sx={{
                        "& .MuiSvgIcon-root": {
                            height: 0,
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default JobInformation;