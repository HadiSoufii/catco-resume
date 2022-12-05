import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import { Container, Box, Button, Rating, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2'

import { ISoftSkill } from './../../interfaces';
import { softSkillSchema } from '../../validations/schemas/resume/softSkillValidation';
import { softSkills } from "../../helpers";

interface IProps {
    softSkill: ISoftSkill,
    handleSubmitForm: (values: ISoftSkill) => Promise<void>,
    userSoftSkills?: string[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const SoftSkillsForm: FC<IProps> = ({ softSkill, handleSubmitForm, userSoftSkills }) => {
    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            ...softSkill
        },
        validationSchema: softSkillSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid xs={12} sm={6}>
                        <FormControl error={Boolean(formik.touched.skillTitle && formik.errors.skillTitle)} fullWidth>
                            <InputLabel id="languageTitle-label">مهارت های نرم</InputLabel>
                            <Select
                                labelId='skillTitle-label'
                                id="skillTitle"
                                name='skillTitle'
                                label="مهارت های نرم"
                                value={formik.values.skillTitle}
                                onChange={formik.handleChange}
                                MenuProps={MenuProps}
                                disabled={location.pathname.toLowerCase().startsWith("/admin/resume/softskills/editsoftskill")}
                            >
                                {
                                    userSoftSkills === undefined ?
                                        softSkills.map(softSkill => (
                                            <MenuItem key={softSkill} value={softSkill}>{softSkill}</MenuItem>
                                        )) :
                                        softSkills.filter(
                                            function (e) {
                                                return userSoftSkills.indexOf(e) < 0;
                                            }
                                        )
                                            .map(softSkill => (
                                                <MenuItem key={softSkill} value={softSkill}>{softSkill}</MenuItem>
                                            ))
                                }
                            </Select>
                            {
                                Boolean(formik.touched.skillTitle && formik.errors.skillTitle) &&
                                <FormHelperText>{formik.errors.skillTitle}</FormHelperText>
                            }
                        </FormControl>

                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Rating
                            name="skillLevel"
                            id="skillLevel"
                            value={formik.values.skillLevel}
                            onChange={(e, value) => formik.setFieldValue("skillLevel", value, true)}
                            max={4}
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

export default SoftSkillsForm;