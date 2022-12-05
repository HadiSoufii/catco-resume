import { FC } from 'react';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Box, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import jMoment from "moment-jalaali";

import { DatePickerPersianProvider } from '../../inputs';

import { IPersonal } from '../../../interfaces';
import { personalSchema } from '../../../validations/schemas/user/personalValidation';
import { ServiceStatus } from '../../../helpers/enums';

interface IProps {
    personal: IPersonal,
    handleSubmitForm: (values: IPersonal) => Promise<void>,
}

const UserPersonalInformationForm: FC<IProps> = ({ personal, handleSubmitForm }) => {
    const formik = useFormik({
        initialValues: {
            ...personal
        },
        validationSchema: personalSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <DatePickerPersianProvider>
                            <DatePicker
                                onChange={(value) => formik.setFieldValue("birthDay", new Date(jMoment(value).format()), true)}
                                value={formik.values.birthDay}
                                label="تاریخ تولد"
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        fullWidth
                                        error={Boolean(formik.touched.birthDay && formik.errors.birthDay)}
                                        name="birthDay"
                                        {...params}
                                    />
                                )}
                            />
                        </DatePickerPersianProvider>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="maritalStatus-label">وضعیت تاهل</InputLabel>
                            <Select
                                labelId='maritalStatus-label'
                                id="maritalStatus"
                                name='maritalStatus'
                                label="وضعیت تاهل"
                                value={formik.values.maritalStatus}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="متاهل">متاهل</MenuItem>
                                <MenuItem value="مجرد">مجرد</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-label">جنسیت</InputLabel>
                            <Select
                                labelId='gender-label'
                                id="gender"
                                name='gender'
                                label="جنسیت"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="آقا">آقا</MenuItem>
                                <MenuItem value="خانوم">خانوم</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="serviceStatus-label">خدمت سربازی</InputLabel>
                            <Select
                                labelId='serviceStatus-label'
                                id="serviceStatus"
                                name='serviceStatus'
                                label="خدمت سربازی"
                                value={formik.values.serviceStatus}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={ServiceStatus.None}>{ServiceStatus.None}</MenuItem>
                                <MenuItem value={ServiceStatus.EndService}>{ServiceStatus.EndService}</MenuItem>
                                <MenuItem value={ServiceStatus.PermanentExemption}>{ServiceStatus.PermanentExemption}</MenuItem>
                                <MenuItem value={ServiceStatus.EducationPardon}>{ServiceStatus.EducationPardon}</MenuItem>
                                <MenuItem value={ServiceStatus.Serving}>{ServiceStatus.Serving}</MenuItem>
                                <MenuItem value={ServiceStatus.Included}>{ServiceStatus.Included}</MenuItem>
                            </Select>
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
            </Box>
        </Container >
    );
};

export default UserPersonalInformationForm;