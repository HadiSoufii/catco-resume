import { FC, useState } from "react";
import { useFormik } from 'formik';
import { Container, Box, TextField, Button, FormControlLabel, Checkbox, Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { ILogin } from '../interfaces';
import { loginSchema } from '../validations/schemas/loginValidation';

import Catco from "../assets/images/LogoCatco.jpg";

interface IProps {
    login: ILogin,
    handleSubmitForm: (values: ILogin) => Promise<void>,
}

const LoginForm: FC<IProps> = ({ login, handleSubmitForm }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            ...login
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Box sx={{
            background: `url(${require("../assets/images/bg01.jpeg")}) no-repeat center center /cover`,
            height: 1, display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <Container maxWidth="sm" sx={{
                backgroundImage: "linear-gradient(to bottom left, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
                backdropFilter: "blur(10px)",
                boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.5)",
                borderLeft: "solid 1px rgba(255, 255, 255, 0.8)",
                borderTop: "solid 1px rgba(255, 255, 255, 0.8)",
                borderRadius: "15px",
                padding: "15px"
            }}>
                <Avatar alt="Logo"
                    src={Catco}
                    variant="rounded"
                    sx={{ width: "50%", margin: "auto", height: "70px" }}
                />
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid xs={12}>
                            <TextField
                                required
                                variant="standard"
                                fullWidth
                                name="userName"
                                id="userName"
                                label="نام کاربری"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.errors.userName && formik.touched.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                required
                                variant="standard"
                                fullWidth
                                name="password"
                                id="password"
                                label="کلمه عبور"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.errors.password && formik.touched.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                        ورود
                    </Button>
                </Box>
            </Container >
        </Box >
    );
};

export default LoginForm;