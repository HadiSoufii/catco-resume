import { useState, FC } from "react";
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import jMoment from "moment-jalaali";

import { DatePickerPersianProvider } from '../inputs';

import { IEducation } from './../../interfaces';
import { educationSchema } from '../../validations/schemas/resume/educationValidation';


interface IProps {
    education: IEducation,
    handleSubmitForm: (values: IEducation) => Promise<void>,
}

const EducationForm: FC<IProps> = ({ education, handleSubmitForm }) => {
    const [showEndDate, setShowEndDate] = useState<boolean>(education.endDate.toString() !== "" ? false : true);

    const handleChangeShowEndDate = () => {
        if (showEndDate === true) {
            setShowEndDate(false);
            formik.setFieldValue("endDate", new Date(), true);
        } else {
            setShowEndDate(true);
            formik.setFieldValue("endDate", "", true);
        }
    }

    const formik = useFormik({
        initialValues: {
            ...education
        },
        validationSchema: educationSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="educationTitle"
                            id="educationTitle"
                            label="نام رشته تحصیلی"
                            value={formik.values.educationTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.educationTitle && formik.touched.educationTitle)}
                            helperText={formik.touched.educationTitle && formik.errors.educationTitle}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="nameOfInstitution"
                            name="nameOfInstitution"
                            label="سطح دوره تحصیلی و نام دانشگاه یا مدرسه"
                            value={formik.values.nameOfInstitution}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.nameOfInstitution && formik.touched.nameOfInstitution)}
                            helperText={formik.touched.nameOfInstitution && formik.errors.nameOfInstitution}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <DatePickerPersianProvider>
                            <DatePicker
                                onChange={(value) => formik.setFieldValue("startDate", new Date(jMoment(value).format()), true)}
                                value={formik.values.startDate}
                                label="تاریخ شروع تحصیل"
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        fullWidth
                                        name="startDate"
                                        {...params}
                                    />
                                )}
                            />
                        </DatePickerPersianProvider>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        {
                            !showEndDate && <DatePickerPersianProvider>
                                <DatePicker
                                    onChange={(value) => formik.setFieldValue("endDate", new Date(jMoment(value).format()), true)}
                                    value={formik.values.endDate}
                                    label="تاریخ فارغ الحتصیلی"
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            name="endDate"
                                            {...params}
                                        />
                                    )}
                                />
                            </DatePickerPersianProvider>
                        }
                        <FormControlLabel
                            control=
                            {
                                <Switch
                                    color='secondary'
                                    onChange={handleChangeShowEndDate}
                                    checked={showEndDate}
                                />
                            }
                            label="هنوز در حال تحصیل هستم"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="average"
                            id="average"
                            label="معدل"
                            value={formik.values.average}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.average && formik.touched.average)}
                            helperText={formik.touched.average && formik.errors.average}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="educationDescription"
                            id="educationDescription"
                            label="توضیحات (اختیاری)"
                            type="text"
                            multiline
                            rows={4}
                            value={formik.values.educationDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.educationDescription && formik.touched.educationDescription)}
                            helperText={formik.touched.educationDescription && formik.errors.educationDescription}
                        />
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

export default EducationForm;