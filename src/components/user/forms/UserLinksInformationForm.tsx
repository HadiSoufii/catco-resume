import { FC } from "react";
import { useFormik } from "formik";
import { Container, Box, TextField, Button, InputAdornment } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { linksSchema } from "../../../validations/schemas/user/linksValidation";
import { ILink } from "../../../interfaces";

interface IProps {
    links: ILink,
    handleSubmitForm: (values: ILink) => Promise<void>,
}

const UserLinksInformationForm: FC<IProps> = ({ links, handleSubmitForm }) => {
    const formik = useFormik({
        initialValues: {
            ...links
        },
        validationSchema: linksSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="stackOverflow"
                            id="stackOverflow"
                            label="استک اور فلو (اختیاری)"
                            dir="ltr"
                            value={formik.values.stackOverflow}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.stackOverflow && formik.errors.stackOverflow)}
                            helperText={formik.touched.stackOverflow && formik.errors.stackOverflow}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box fontSize={30} className="fab fa-stack-overflow" component="i"></Box>
                                    </InputAdornment>
                                ),
                            }}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="gitHub"
                            id="gitHub"
                            label="  گیت هاب (اختیاری)"
                            dir="ltr"
                            value={formik.values.gitHub}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.gitHub && formik.errors.gitHub)}
                            helperText={formik.touched.gitHub && formik.errors.gitHub}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box fontSize={30} className="fab fa-github" component="i"></Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="gitable"
                            id="gitable"
                            dir="ltr"
                            label="  گیت لب (اختیاری)"
                            value={formik.values.gitLab}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.gitLab && formik.errors.gitLab)}
                            helperText={formik.touched.gitLab && formik.errors.gitLab}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box fontSize={30} className="fab fa-gitlab" component="i"></Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            name="linkdein"
                            id="linkdein"
                            dir="ltr"
                            label=" لینکدین (اختیاری)"
                            value={formik.values.linkdein}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.linkdein && formik.errors.linkdein)}
                            helperText={formik.touched.linkdein && formik.errors.linkdein}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box fontSize={30} className="fab fa-linkedin" component="i"></Box>
                                    </InputAdornment>
                                ),
                            }}
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
        </Container>
    );
};

export default UserLinksInformationForm;