import { FC } from 'react';
import { useFormik } from 'formik';
import { Container, Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { IContact } from '../../../interfaces';
import { contactSchema } from '../../../validations/schemas/user/contactValidation';


interface IProps {
    contact: IContact,
    handleSubmitForm: (values: IContact) => Promise<void>,
}

const UserContactInformationForm: FC<IProps> = ({ contact, handleSubmitForm }) => {

    const formik = useFormik({
        initialValues: {
            ...contact
        },
        validationSchema: contactSchema,
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
                            name="email"
                            id="email"
                            label="ایمیل"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.email && formik.touched.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="mobile"
                            name="mobile"
                            label="موبایل (اختیاری)"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.mobile && formik.touched.mobile ? true : false}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                            dir="ltr"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="address"
                            id="address"
                            label="آدرس"
                            type="text"
                            multiline
                            rows={4}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.address && formik.touched.address ? true : false}
                            helperText={formik.touched.address && formik.errors.address}
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

export default UserContactInformationForm;