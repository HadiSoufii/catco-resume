import { FC } from 'react';
import { useFormik } from 'formik';
import { Container, Box, Button, InputLabel, Select, MenuItem, FormControl, OutlinedInput, Chip, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { IJob } from '../../../interfaces';
import { citys, EmploymentStatus, JobType } from '../../../helpers';
import { jobSchema } from '../../../validations/schemas/user/jobValidation';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface IProps {
    job: IJob,
    handleSubmitForm: (values: IJob) => Promise<void>,
}

const UserJobInformationForm: FC<IProps> = ({ job, handleSubmitForm }) => {
    const formik = useFormik({
        initialValues: {
            ...job
        },
        validationSchema: jobSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="EmploymentStatus-label">وضعیت اشتغال</InputLabel>
                            <Select
                                labelId='EmploymentStatus-label'
                                id="EmploymentStatus"
                                name='EmploymentStatus'
                                label="وضعیت اشتغال"
                                value={formik.values.EmploymentStatus}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={EmploymentStatus.ActiveSearch}>{EmploymentStatus.ActiveSearch}</MenuItem>
                                <MenuItem value={EmploymentStatus.Interested}>{EmploymentStatus.Interested}</MenuItem>
                                <MenuItem value={EmploymentStatus.NoWork}>{EmploymentStatus.NoWork}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="JobType-label">نوع شغل مورد نظر</InputLabel>
                            <Select
                                labelId='JobType-label'
                                id="JobType"
                                name='JobType'
                                value={formik.values.JobType}
                                label="نوع شغل مورد نظر"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={JobType.FullTime}>{JobType.FullTime}</MenuItem>
                                <MenuItem value={JobType.PartTime}>{JobType.PartTime}</MenuItem>
                                <MenuItem value={JobType.Project}>{JobType.Project}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} >
                        <FormControl error={Boolean(formik.touched.EmploymentCities && formik.errors.EmploymentCities)} fullWidth>
                            <InputLabel id="employmentCities-label">شهرهایی که در آن امکان کار دارم</InputLabel>
                            <Select
                                labelId="employmentCities-label"
                                id="EmploymentCities"
                                name="EmploymentCities"
                                label="شهرهایی که در آن امکان کار دارم"
                                multiple
                                value={formik.values.EmploymentCities}
                                onChange={formik.handleChange}
                                input={<OutlinedInput id="EmploymentCities" label="شهرهایی که در آن امکان کار دارم" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {citys.map((city) => (
                                    <MenuItem
                                        key={city}
                                        value={city}
                                    >
                                        {city}
                                    </MenuItem>
                                ))}
                            </Select>
                            {
                                Boolean(formik.touched.EmploymentCities && formik.errors.EmploymentCities) &&
                                <FormHelperText>{formik.errors.EmploymentCities}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    ثبت
                </Button>
            </Box >
        </Container >
    );
};

export default UserJobInformationForm;