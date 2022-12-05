import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { Card, CardContent, Grow, Box, Skeleton } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Title, Skill, RatingCircle } from "../../components/main";
import { NoContent } from "../../components";

import { ISkill, ISoftSkill, ILanguage } from '../../interfaces';
import { MainContext } from "../../services/contexts";
import { skills as skillApi, softSkills as softSkillApi, languages as languageApi } from '../../services/api/apiService';
import { Key } from "@mui/icons-material";

const Skills = () => {
    const navigate = useNavigate();
    const { currentUser, loadingPage, setLoadingPage } = useContext(MainContext);

    const [checked, setChecked] = useState<boolean>(false);
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [softSkills, setSoftSkills] = useState<ISoftSkill[]>([]);
    const [languages, setLanguages] = useState<ILanguage[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPage(true);

                const { status: statusSkills, data: dataSkills } = await skillApi.getAllSkillByUserId(currentUser.id || 0);
                if (statusSkills === 200 && dataSkills.length > 0) {
                    setSkills(dataSkills)
                }

                const { status: statusSoftSkills, data: dataSoftSkills } = await softSkillApi.getAllSoftSkillByUserId(currentUser.id || 0);
                if (statusSoftSkills === 200 && dataSoftSkills.length > 0) {
                    setSoftSkills(dataSoftSkills)
                }

                const { status: statusLanguages, data: dataLanguages } = await languageApi.getAllLanguageByUserId(currentUser.id || 0);
                if (statusLanguages === 200 && dataLanguages.length > 0) {
                    setLanguages(dataLanguages)
                }

                setLoadingPage(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/notfound");
            }
        };

        fetchData();
        setChecked(true);

        // eslint-disable-next-line
    }, [currentUser])

    return (
        <Card sx={{
            height: "100vh",
            overflowY: "scroll"
        }}>
            <CardContent>
                <Grid container sx={{ mx: 3 }} >
                    <Grid sx={{ width: 1 }}>
                        <Title textAlign='left' titleText='مهارت ها' />
                        {
                            skills.length > 0 ?
                                skills.map((item, index) => (
                                    <Box key={item.id}>
                                        {
                                            loadingPage ?
                                                <Skeleton animation="wave" width="100%" height={30} sx={{ mt: 3 }} />
                                                :
                                                <Grow timeout={1000 * (index + 1)} in={checked}>
                                                    <Box>
                                                        <Skill name={item.skillTitle} value={item.LevelProgress} />
                                                    </Box>
                                                </Grow>
                                        }
                                    </Box>
                                ))
                                : !loadingPage && <NoContent color="primary.main" />
                        }
                    </Grid>
                </Grid>
                <Grid container sx={{ mx: 3 }} >
                    <Grid xs={12} lg={6} sx={{ mt: 8 }}>
                        <Title textAlign='left' titleText='مهارت های نرم' />
                        {
                            softSkills.length > 0 ?
                                softSkills.map((item, index) => (
                                    <Box key={item.id}>
                                        {
                                            loadingPage ?
                                                <Skeleton animation="wave" width="50%" sx={{ mt: 3 }} />
                                                :
                                                <Grow timeout={1000 * (index + 1)} in={checked}>
                                                    <Box>
                                                        <RatingCircle name={item.skillTitle} value={item.skillLevel} />
                                                    </Box>
                                                </Grow>
                                        }
                                    </Box>
                                ))
                                : !loadingPage && <NoContent color="primary.main" />
                        }
                    </Grid>
                    <Grid xs={12} lg={6} sx={{ mt: 8 }}>
                        <Title textAlign='left' titleText='زبان ها' />
                        {
                            languages.length > 0 ?
                                languages.map((item, index) => (
                                    <Box key={item.id}>
                                        {
                                            loadingPage ?
                                                <Skeleton animation="wave" width="50%" sx={{ mt: 3 }} />
                                                :
                                                <Grow timeout={1000 * (index + 1)} in={checked}>
                                                    <Box>
                                                        <RatingCircle name={item.languageTitle} value={item.languageLevel} />
                                                    </Box>
                                                </Grow>
                                        }
                                    </Box>
                                )) : !loadingPage && <NoContent color="primary.main" />
                        }
                    </Grid>
                </Grid>
            </CardContent >
        </Card >
    );
};

export default Skills;