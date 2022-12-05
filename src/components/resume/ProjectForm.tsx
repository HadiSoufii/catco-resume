import { FC } from "react";
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import jMoment from "moment-jalaali";

import { DatePickerPersianProvider } from '../inputs';

import { IProject } from './../../interfaces';
import { projectSchema } from '../../validations/schemas/resume/projectValidation';

interface IProps {
    project: IProject,
    handleSubmitForm: (values: IProject) => Promise<void>,
}

const ProjectForm: FC<IProps> = ({ project, handleSubmitForm }) => {

    const formik = useFormik({
        initialValues: {
            ...project
        },
        validationSchema: projectSchema,
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
                            name="projectTitle"
                            id="projectTitle"
                            label="عنوان پروژه"
                            value={formik.values.projectTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.projectTitle && formik.touched.projectTitle)}
                            helperText={formik.touched.projectTitle && formik.errors.projectTitle}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <DatePickerPersianProvider>
                            <DatePicker
                                onChange={(value) => formik.setFieldValue("projectDate", new Date(jMoment(value).format()), true)}
                                value={formik.values.projectDate}
                                label="تاریخ شروع پروژه"
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        fullWidth
                                        name="projectDate"
                                        {...params}
                                    />
                                )}
                            />
                        </DatePickerPersianProvider>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="projectLink"
                            id="projectLink"
                            label="لینک پروژه"
                            value={formik.values.projectLink}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.projectLink && formik.touched.projectLink)}
                            helperText={formik.touched.projectLink && formik.errors.projectLink}
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

export default ProjectForm;