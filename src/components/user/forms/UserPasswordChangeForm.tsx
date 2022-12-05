import { FC, useState } from 'react';
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Container, Box, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { changePasswordSchema } from "../../../validations/schemas/user/changePasswordValidation";
import { IPassword } from '../../../interfaces';

interface IProps {
    password: IPassword,
    handleSubmitForm: (values: IPassword) => Promise<void>,
}

const UserPasswordChangeForm: FC<IProps> = ({ password, handleSubmitForm }) => {

    const location = useLocation();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            ...password
        },
        validationSchema: changePasswordSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {
                        location.pathname.toLowerCase() === "/admin/userpanel/editpassword" &&
                        <Grid xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="oldPassword"
                                id="oldPassword"
                                label="کلمه عبور قبلی"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.oldPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.oldPassword && formik.touched.oldPassword ? true : false}
                                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                            />
                        </Grid>
                    }
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            id="password"
                            label="کلمه عبور"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.password && formik.touched.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="rePassword"
                            id="rePassword"
                            label="تکرار کلمه عبور"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.rePassword && formik.touched.rePassword ? true : false}
                            helperText={formik.touched.rePassword && formik.errors.rePassword}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <FormControlLabel
                            control=
                            {
                                <Checkbox
                                    onChange={() => setShowPassword(!showPassword)}
                                    checked={showPassword}
                                    color='secondary'
                                />
                            }
                            label="نمایش پسورد" />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    ویرایش پسورد
                </Button>
            </Box>
        </Container >
    );
};

export default UserPasswordChangeForm;