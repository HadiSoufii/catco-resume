import { FC } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Container, Box, FormControlLabel, TextField, CssBaseline, Button, Switch } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { InputTags } from '../../inputs';

import { userSchema } from "../../../validations/schemas/user/userValidation";
import { IUser } from "../../../interfaces";

interface IProps {
    user: IUser,
    handleSubmitForm: (values: IUser) => Promise<void>,
}

const UserForm: FC<IProps> = ({ user, handleSubmitForm }) => {

    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            ...user
        },
        validationSchema: userSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <CssBaseline />
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="fullName"
                            id="fullName"
                            label="نام و نام خانوادگی"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.fullName && formik.touched.fullName ? true : false}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="userName"
                            name="userName"
                            label="نام کاربری"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.userName && formik.touched.userName ? true : false}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="avatar"
                            id="avatar"
                            label="پروفایل"
                            value={formik.values.avatar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.avatar && formik.touched.avatar ? true : false}
                            helperText={formik.touched.avatar && formik.errors.avatar}
                        />
                    </Grid>
                    {
                        location.pathname.toLowerCase() === "/admin/users/adduser" &&
                        <Grid xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                id="password"
                                label="کلمه عبور"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.password && formik.touched.password ? true : false}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                    }
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="aboutMe"
                            id="aboutMe"
                            label="درباره من (اختیاری)"
                            multiline
                            rows={4}
                            value={formik.values.aboutMe}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.aboutMe && formik.touched.aboutMe ? true : false}
                            helperText={formik.touched.aboutMe && formik.errors.aboutMe}
                        />
                    </Grid>
                    <Grid xs={12}>
                        {
                            location.pathname.toLowerCase() !== "/admin/userpanel/editaccount" &&
                            <FormControlLabel
                                control=
                                {
                                    <Switch
                                        name="isAdmin"
                                        id="isAdmin"
                                        color='secondary'
                                        onChange={formik.handleChange}
                                        checked={formik.values.isAdmin}
                                    />
                                }
                                label="دسترسی ادمین" />
                        }
                        {
                            location.pathname.toLowerCase() === "/admin/userpanel/editaccount" &&
                            <FormControlLabel
                                control=
                                {
                                    <Switch
                                        name="isShowResume"
                                        id="isShowResume"
                                        color='secondary'
                                        onChange={formik.handleChange}
                                        checked={formik.values.isShowResume}
                                    />
                                }
                                label="نشان دادن رزومه به دیگران" />
                        }
                    </Grid>
                    <Grid xs={12}>
                        <InputTags
                            required={false}
                            name="me"
                            id="me"
                            label="برچسب های توصیف من (با دکمه enter برچسب ثبت کنید)"
                            valueTags={formik.values.me}
                            setFieldValue={formik.setFieldValue}
                            error={Boolean(formik.errors.me)}
                            helperText={formik.errors.me ? formik.errors.me : undefined}
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
                    {
                        location.pathname.toLowerCase() === "/admin/users/adduser" ? "ایجاد کاربر" : "ویرایش"
                    }
                </Button>
            </Box>
        </Container>
    );
};



export default UserForm;