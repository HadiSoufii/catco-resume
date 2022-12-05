import { FC } from "react";
import { useFormik } from 'formik';
import { useLocation } from "react-router-dom";
import { Container, Box, Button, Rating, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2'

import { ILanguage } from './../../interfaces';
import { languageSchema } from '../../validations/schemas/resume/languageValidation';
import { languages } from "../../helpers";

interface IProps {
    language: ILanguage,
    handleSubmitForm: (values: ILanguage) => Promise<void>,
    userLanguages?: string[]
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

const LanguageForm: FC<IProps> = ({ language, handleSubmitForm, userLanguages }) => {
    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            ...language
        },
        validationSchema: languageSchema,
        onSubmit: values => {
            handleSubmitForm(values);
        }
    });

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid xs={12} sm={6}>
                        <FormControl error={Boolean(formik.touched.languageTitle && formik.errors.languageTitle)} fullWidth>
                            <InputLabel id="languageTitle-label">زبان</InputLabel>
                            <Select
                                labelId='languageTitle-label'
                                id="languageTitle"
                                name='languageTitle'
                                label="زبان"
                                value={formik.values.languageTitle}
                                onChange={formik.handleChange}
                                MenuProps={MenuProps}
                                disabled={location.pathname.toLowerCase().startsWith("/admin/resume/languages/editlanguage")}
                            >
                                {
                                    userLanguages === undefined ?
                                        languages.map(language => (
                                            <MenuItem key={language} value={language}>{language}</MenuItem>
                                        )) :
                                        languages.filter(
                                            function (e) {
                                                return userLanguages.indexOf(e) < 0;
                                            }
                                        )
                                            .map(language => (
                                                <MenuItem key={language} value={language}>{language}</MenuItem>
                                            ))
                                }
                            </Select>
                            {
                                Boolean(formik.touched.languageTitle && formik.errors.languageTitle) &&
                                <FormHelperText>{formik.errors.languageTitle}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Rating
                            name="languageLevel"
                            id="languageLevel"
                            value={formik.values.languageLevel}
                            onChange={(e, value) => formik.setFieldValue("languageLevel", value, true)}
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

export default LanguageForm;