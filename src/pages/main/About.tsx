import { useEffect, useContext, useState, useCallback } from "react";
import { Card, CardContent, Avatar, Box, Chip, Stack, Collapse, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JMoment from "moment-jalaali";

import { DevInfo, Title, IconLink } from "../../components/main";

import { IContact, IPersonal, IJob, ILink } from '../../interfaces';
import { MainContext } from "../../services/contexts";
import { contacts as contactApi, personals as personalApi, jobs as jobApi, links as linkApi } from '../../services/api/apiService';


const About = () => {
    const navigate = useNavigate();
    const { currentUser, loadingPage, setLoadingPage } = useContext(MainContext);

    const [checked, setChecked] = useState<boolean>(false);
    const [contact, setContact] = useState<IContact>();
    const [personal, setPersonal] = useState<IPersonal>();
    const [job, setJob] = useState<IJob>();
    const [links, setLinks] = useState<ILink>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPage(true);

                const { status: statusContact, data: dataContact } = await contactApi.getContactByUserId(currentUser.id || 0);
                if (statusContact === 200 && dataContact.length > 0) {
                    setContact(dataContact[0])
                }

                const { status: statusPersonal, data: dataPersonal } = await personalApi.getPersonalByUserId(currentUser.id || 0);
                if (statusPersonal === 200 && dataPersonal.length > 0) {
                    setPersonal(dataPersonal[0])
                }

                const { status: statusJob, data: dataJob } = await jobApi.getJobByUserId(currentUser.id || 0);
                if (statusJob === 200 && dataJob.length > 0) {
                    setJob(dataJob[0])
                }

                const { status: statusLinks, data: dataLinks } = await linkApi.getLinkByUserId(currentUser.id || 0);
                if (statusLinks === 200 && dataLinks.length > 0) {
                    setLinks(dataLinks[0])
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
    }, [currentUser]);

    const _calculateAge = useCallback((birthday: Date) => {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);

        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <Card sx={{
            height: "100vh",
            overflowY: "scroll"
        }}>
            <CardContent>
                <Collapse in={checked} orientation="vertical" timeout={1500}>
                    <Grid container sx={{ mx: 3 }} >
                        <Grid xs={0} sm={0} md={4} lg={4} xl={4}>
                            {
                                loadingPage ?
                                    <Skeleton
                                        sx={{
                                            height: "250px", width: "250px", margin: "0 auto",
                                            display: {
                                                xs: "none",
                                                md: "block"
                                            }
                                        }}
                                        animation="wave" variant="rounded" />
                                    :
                                    <Avatar src={currentUser.avatar} alt={currentUser.userName} variant="rounded"
                                        sx={{
                                            height: "250px", width: "250px", margin: "0 auto",
                                            boxShadow: (theme) => `5px 5px 15px 0px ${theme.palette.text.disabled}`,
                                            display: {
                                                xs: "none",
                                                md: "block"
                                            }
                                        }} />
                            }

                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Title textAlign="left" titleText={`درباره ${currentUser.fullName}`} />
                            <DevInfo>
                                {loadingPage ? <Skeleton width="50%" sx={{ mt: 3 }} /> :
                                    `نام و نام خانوادگی : ${currentUser.fullName}`}
                            </DevInfo>
                            <DevInfo>
                                {
                                    loadingPage ? <Skeleton width="100%" sx={{ mt: 2 }} /> : `${currentUser.aboutMe}`
                                }
                            </DevInfo>
                        </Grid>
                    </Grid>
                </Collapse>
                <Collapse in={checked} timeout={3000}>
                    <Grid container sx={{ mx: 3 }}>
                        <Grid xs={12} lg={6} sx={{ mt: 4 }}>
                            <Title textAlign="left" titleText="اطلاعات تماس" />
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `آدرس : ${contact?.address}`}</DevInfo>
                            <DevInfo>
                                {
                                    loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> :
                                        `شماره تلفن : ${contact?.mobile ? contact?.mobile : "شماره موبایلی ثبت نشده است"}`
                                }
                            </DevInfo>
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `آدرس ایمیل : ${contact?.email}`}</DevInfo>
                        </Grid>
                        <Grid xs={12} lg={6} sx={{ mt: 4 }}>
                            <Title textAlign="left" titleText="اطلاعات فردی" />
                            <DevInfo>
                                {
                                    loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `سن :
                                ${_calculateAge(personal?.birthDay ? new Date(JMoment(personal?.birthDay).format("YYYY/MM/DD")) : new Date())}`
                                }
                            </DevInfo>
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `وضعیت تاهل : ${personal?.maritalStatus}`}</DevInfo>
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `جنسیت : ${personal?.gender}`}</DevInfo>
                            {personal?.gender === "آقا" &&
                                <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `وضعیت خدمت : ${personal?.serviceStatus}`}</DevInfo>}
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }}>
                            <Title textAlign="left" titleText="اطلاعات شغلی" />
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `وضعیت اشتغال : ${job?.EmploymentStatus}`}</DevInfo>
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `نوع شغل مورد نظر : ${job?.JobType}`}</DevInfo>
                            <DevInfo>{loadingPage ? <Skeleton width="50%" sx={{ mt: 2 }} /> : `شهر هایی که در آن امکان کار دارم : `}</DevInfo>
                            {loadingPage ? <Skeleton sx={{ mt: 2 }} /> :
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ my: 2, ml: 3 }}>
                                    {
                                        job?.EmploymentCities.map(city => (
                                            <Chip key={city} label={city} color="primary" variant="outlined" />
                                        ))
                                    }
                                </Stack>
                            }
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }}>
                            <Title textAlign="left" titleText="لینکها" />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    my: 2,
                                }}>
                                <IconLink linkUrl={links?.stackOverflow ? links?.stackOverflow : ""} classNameIcon="fab fa-stack-overflow">
                                    {loadingPage && <Skeleton animation="wave" variant="circular" width="50px" height="50px" sx={{ mt: 2 }} />}
                                </IconLink>

                                <IconLink linkUrl={links?.gitHub ? links?.gitHub : ""} classNameIcon="fab fa-github" >
                                    {loadingPage && <Skeleton animation="wave" variant="circular" width="50px" height="50px" sx={{ mt: 2 }} />}
                                </IconLink>
                                <IconLink linkUrl={links?.gitLab ? links?.gitLab : ""} classNameIcon="fab fa-gitlab" >
                                    {loadingPage && <Skeleton animation="wave" variant="circular" width="50px" height="50px" sx={{ mt: 2 }} />}
                                </IconLink>
                                <IconLink linkUrl={links?.linkdein ? links?.linkdein : ""} classNameIcon="fab fa-linkedin" >
                                    {loadingPage && <Skeleton animation="wave" variant="circular" width="50px" height="50px" sx={{ mt: 2 }} />}
                                </IconLink>
                            </Box>
                        </Grid>
                    </Grid>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default About;