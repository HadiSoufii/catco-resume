import { useState, FC } from "react";
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import jMoment from "moment-jalaali";

import { DatePickerPersianProvider, InputTags } from '../inputs';

import { ICertificate } from './../../interfaces';
import { certificateSchema } from '../../validations/schemas/resume/certificateValidation';

interface IProps {
    certificate: ICertificate,
    handleSubmitForm: (values: ICertificate) => Promise<void>,
}

const CertificateForm: FC<IProps> = ({ certificate, handleSubmitForm }) => {
    const [showEndDate, setShowEndDate] = useState<boolean>(certificate.endDate.toString() !== "" ? false : true);

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
            ...certificate
        },
        validationSchema: certificateSchema,
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
                            name="certificateTitle"
                            id="certificateTitle"
                            label="عنوان گواهی"
                            value={formik.values.certificateTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.certificateTitle && formik.touched.certificateTitle)}
                            helperText={formik.touched.certificateTitle && formik.errors.certificateTitle}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="nameOfInstitution"
                            name="nameOfInstitution"
                            label="موسسه اعطا کننده"
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
                                label="تاریخ شروع اعتبار گواهی"
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
                                    label="تاریخ اتمام اعتبار گواهی"
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
                            label="این مدرک تاریخ اتمام اعتبار ندارد"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="certificateLink"
                            id="certificateLink"
                            label="لینک تایید گواهی (اختیاری)"
                            value={formik.values.certificateLink}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.certificateLink && formik.touched.certificateLink)}
                            helperText={formik.touched.certificateLink && formik.errors.certificateLink}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="certificateDescription"
                            id="certificateDescription"
                            label="توضیحات (اختیاری)"
                            type="text"
                            multiline
                            rows={4}
                            value={formik.values.certificateDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.certificateDescription && formik.touched.certificateDescription)}
                            helperText={formik.touched.certificateDescription && formik.errors.certificateDescription}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputTags
                            required={false}
                            name="certificateTags"
                            id="certificateTags"
                            label="برچسب های گواهی (با دکمه enter برچسب ثبت کنید) (اختیاری)"
                            valueTags={formik.values.certificateTags}
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

export default CertificateForm;