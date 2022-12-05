import { useEffect, useContext, useState, useCallback } from "react";
import { Card, CardContent, Slide, Box, Skeleton } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jMoment from "moment-jalaali";


import { Title, AchievementCard, CertificateCard } from "../../components/main";
import { NoContent } from "../../components";

import { IWorkExperience, IEducation, ICertificate } from '../../interfaces';
import { MainContext } from "../../services/contexts";
import { workExperiences as workExperienceApi, educations as educationApi, certificates as certificateApi } from '../../services/api/apiService';

import education from "../../assets/images/education.svg"

const Achievements = () => {
    const navigate = useNavigate();
    const { currentUser, loadingPage, setLoadingPage } = useContext(MainContext);

    const [checked, setChecked] = useState<boolean>(false);
    const [workExperiences, setWorkExperiences] = useState<IWorkExperience[]>([]);
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [certificates, setCertificates] = useState<ICertificate[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPage(true);

                const { status: statusWorkExperiences, data: dataWorkExperiences } = await workExperienceApi.getAllWorkExperienceByUserId(currentUser.id || 0);
                if (statusWorkExperiences === 200 && dataWorkExperiences.length > 0) {
                    setWorkExperiences(dataWorkExperiences)
                }

                const { status: statusEducations, data: dataEducations } = await educationApi.getAllEducationByUserId(currentUser.id || 0);
                if (statusEducations === 200 && dataEducations.length > 0) {
                    setEducations(dataEducations)
                }

                const { status: statusCertificates, data: dataCertificates } = await certificateApi.getAllCertificateByUserId(currentUser.id || 0);
                if (statusCertificates === 200 && dataCertificates.length > 0) {
                    setCertificates(dataCertificates)
                }

                setLoadingPage(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/notfound");
            }
        }
        fetchData();
        setChecked(true);

        // eslint-disable-next-line
    }, [currentUser])

    const getDate = useCallback((startDate: Date, endDate: Date): string => {
        const formatJalaliStartDate = jMoment(startDate).format('jD jMMMM jYYYY');
        const formatJalaliEndDate = endDate ? jMoment(endDate).format('jD jMMMM jYYYY') : "";
        return `از ${formatJalaliStartDate} تا ${formatJalaliEndDate ? formatJalaliEndDate : "الان"}`;

        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <Card sx={{
            height: "100vh",
            overflowY: "scroll"
        }}>
            <CardContent>
                <Grid container sx={{ mx: 3 }} spacing={3} >
                    <Grid xs={12}>
                        <Title textAlign='left' titleText='سوابق کاری' />
                    </Grid>
                    {
                        workExperiences.length > 0 ?
                            workExperiences.map((item, index) => (
                                <Box key={item.id} width="100%">
                                    {
                                        loadingPage ?
                                            <Skeleton animation="wave" width="100%" variant="rectangular" height={150} sx={{ mt: 3 }} />
                                            :
                                            <Slide direction="left" in={checked} timeout={1000 * (index + 1)}>
                                                <Grid xs={12} sx={{ mt: 1 }}>
                                                    <AchievementCard title={item.jobTitle} date={getDate(item.startDate, item.endDate)} tags={item.jobTags}
                                                        description={item.jobDescription} linkImageUrl={item.companyPhoto} nameInstitution={item.companyName} />
                                                </Grid>
                                            </Slide>
                                    }
                                </Box>
                            ))
                            : !loadingPage && <Grid xs={12}> <NoContent color="primary.main" /></Grid>
                    }
                </Grid>
                <Grid container sx={{ mx: 3, mt: 5 }} spacing={3} >
                    <Grid xs={12}>
                        <Title textAlign='left' titleText='تحصیلات' />
                    </Grid>
                    {
                        educations.length > 0 ?
                            educations.map((item, index) => (
                                <Box key={item.id} width="100%">
                                    {
                                        loadingPage ?
                                            <Skeleton animation="wave" width="100%" variant="rectangular" height={150} sx={{ mt: 3 }} />
                                            :
                                            <Slide direction="left" in={checked} timeout={1000 * (index + 1)}>
                                                <Grid xs={12} sx={{ mt: 1 }}>
                                                    <AchievementCard title={item.educationTitle} date={getDate(item.startDate, item.endDate)}
                                                        description={item.educationDescription} linkImageUrl={education}
                                                        gpa={item.average} subTitle={item.nameOfInstitution}
                                                    />
                                                </Grid>
                                            </Slide>
                                    }
                                </Box>
                            ))
                            : !loadingPage && <Grid xs={12}><NoContent color="primary.main" /></Grid>
                    }
                </Grid>
                <Grid container sx={{ mx: 3, mt: 5 }} spacing={3} >
                    <Grid xs={12}>
                        <Title textAlign='left' titleText='افتخارات' />
                    </Grid>
                    {
                        certificates.length > 0 ?
                            certificates.map((item, index) => (
                                <Box key={item.id} width="100%">
                                    {
                                        loadingPage ?
                                            <Skeleton animation="wave" width="100%" variant="rectangular" height={150} sx={{ mt: 3 }} />
                                            :
                                            <Slide direction="left" in={checked} timeout={1000 * (index + 1)}>
                                                <Grid xs={12} sx={{ mt: 1 }}>
                                                    <CertificateCard title={item.certificateTitle} date={getDate(item.startDate, item.endDate)}
                                                        description={item.certificateDescription}
                                                        nameInstitution={item.nameOfInstitution}
                                                        link={item.certificateLink} tags={item.certificateTags}
                                                    />
                                                </Grid>
                                            </Slide>
                                    }
                                </Box>
                            ))
                            : !loadingPage && <Grid xs={12}><NoContent color="primary.main" /></Grid>
                    }
                </Grid>
            </CardContent>
        </Card >
    );
};

export default Achievements;