import { useState, FC } from "react";
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import jMoment from "moment-jalaali";

import { DatePickerPersianProvider, InputTags } from '../inputs';

import { IWorkExperience } from './../../interfaces';
import { employmentRecordSchema } from '../../validations/schemas/resume/employmentRecordValidation';

interface IProps {
    EmploymentRecord: IWorkExperience,
    handleSubmitForm: (values: IWorkExperience) => Promise<void>,
}

const EmploymentRecordForm: FC<IProps> = ({ EmploymentRecord, handleSubmitForm }) => {

    const [showEndDate, setShowEndDate] = useState<boolean>(EmploymentRecord.endDate.toString() !== "" ? false : true);

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
            ...EmploymentRecord
        },
        validationSchema: employmentRecordSchema,
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
                            name="jobTitle"
                            id="jobTitle"
                            label="عنوان شغل"
                            value={formik.values.jobTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.jobTitle && formik.touched.jobTitle)}
                            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="companyName"
                            name="companyName"
                            label="نام شرکت"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.companyName && formik.touched.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <DatePickerPersianProvider>
                            <DatePicker
                                onChange={(value) => formik.setFieldValue("startDate", new Date(jMoment(value).format()), true)}
                                value={formik.values.startDate}
                                label="تاریخ شروع کار"
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
                                    label="تاریخ ترک کار"
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
                            label="هنوز مشغول کار هستم"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="companyPhoto"
                            id="companyPhoto"
                            label="آدرس عکس شرکت (اختیاری)"
                            value={formik.values.companyPhoto}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.companyPhoto && formik.touched.companyPhoto)}
                            helperText={formik.touched.companyPhoto && formik.errors.companyPhoto}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="jobDescription"
                            id="jobDescription"
                            label="توضیحات (اختیاری)"
                            type="text"
                            multiline
                            rows={4}
                            value={formik.values.jobDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.jobDescription && formik.touched.jobDescription)}
                            helperText={formik.touched.jobDescription && formik.errors.jobDescription}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputTags
                            required={false}
                            name="jobTags"
                            id="jobTags"
                            label="برچسب های شغل (با دکمه enter برچسب ثبت کنید) (اختیاری)"
                            valueTags={formik.values.jobTags}
                            setFieldValue={formik.setFieldValue}
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

export default EmploymentRecordForm;