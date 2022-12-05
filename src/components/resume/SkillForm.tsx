import { FC } from "react";
import { useFormik } from 'formik';
import { Container, Box, TextField, Button, Slider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { ISkill } from './../../interfaces';
import { skillSchema } from '../../validations/schemas/resume/skillValidation';
import { marksSkill } from "./../../helpers"

interface IProps {
    skill: ISkill,
    handleSubmitForm: (values: ISkill) => Promise<void>,
}


const SkillForm: FC<IProps> = ({ skill, handleSubmitForm }) => {

    const formik = useFormik({
        initialValues: {
            ...skill
        },
        validationSchema: skillSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="skillTitle"
                            id="skillTitle"
                            label="عنوان مهارت"
                            value={formik.values.skillTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.skillTitle && formik.touched.skillTitle)}
                            helperText={formik.touched.skillTitle && formik.errors.skillTitle}
                            autoFocus
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Slider
                            name="LevelProgress"
                            id="LevelProgress"
                            step={5}
                            value={formik.values.LevelProgress}
                            onChange={formik.handleChange}
                            aria-label="LevelProgress"
                            valueLabelDisplay="on"
                            marks={marksSkill}
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

export default SkillForm;