import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Chip, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';


import { Loading } from '../../../components';
import { UserPanelSpeedDial, UserCard, ContactInformation, PersonalInformation, JobInformation, LinksInformation } from '../../../components/user';
import CheckoutInformatios from './CheckoutInformatios';

import { IContact, IPersonal, IJob, ILink } from '../../../interfaces';
import { contacts as contactApi, personals as personalApi, jobs as jobApi, links as linkApi } from '../../../services/api/apiService';
import { toast } from 'react-toastify';
import { EmploymentStatus, JobType, ServiceStatus } from '../../../helpers';
import { AdminContext } from "./../../../services/contexts";

const UserPanel = () => {
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [step, setStep] = useState<number>(4);
    const [contact, setContact] = useState<IContact>({
        userId: userId,
        address: "",
        email: "",
        mobile: "",
    });
    const [personal, setPersonal] = useState<IPersonal>({
        userId: userId,
        birthDay: new Date(),
        gender: "آقا",
        maritalStatus: "متاهل",
        serviceStatus: ServiceStatus.None
    });
    const [job, setJob] = useState<IJob>({
        userId: userId,
        EmploymentStatus: EmploymentStatus.ActiveSearch,
        JobType: JobType.FullTime,
        EmploymentCities: []
    });
    const [links, setLinks] = useState<ILink>({
        userId: userId,
        stackOverflow: "",
        gitHub: "",
        gitLab: "",
        linkdein: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { status: statusContact, data: dataContact } = await contactApi.getContactByUserId(userId);
                if (statusContact === 200 && dataContact.length < 1) {
                    setStep(0);
                    setLoading(false);
                    return
                } else if (statusContact === 200 && dataContact.length > 0) {
                    setContact(dataContact[0])
                }

                const { status: statusPersonal, data: dataPersonal } = await personalApi.getPersonalByUserId(userId);
                if (statusPersonal === 200 && dataPersonal.length < 1) {
                    setStep(1);
                    setLoading(false);
                    return
                } else if (statusPersonal === 200 && dataPersonal.length > 0) {
                    setPersonal(dataPersonal[0])
                }

                const { status: statusJob, data: dataJob } = await jobApi.getJobByUserId(userId);
                if (statusJob === 200 && dataJob.length < 1) {
                    setStep(2);
                    setLoading(false);
                    return
                } else if (statusJob === 200 && dataJob.length > 0) {
                    setJob(dataJob[0])
                }

                const { status: statusLinks, data: dataLinks } = await linkApi.getLinkByUserId(userId);
                if (statusLinks === 200 && dataLinks.length < 1) {
                    setStep(3);
                    setLoading(false);
                    return
                } else if (statusLinks === 200 && dataLinks.length > 0) {
                    setLinks(dataLinks[0])
                }

                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/notfound");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, [step]);

    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        {
                            step <= 3 ? <CheckoutInformatios step={step} setStep={setStep} /> :
                                <>
                                    <Helmet>
                                        <title>پنل کاربری | {userLocalStorage?.fullName || ""}</title>
                                    </Helmet>
                                    <Grid container spacing={4} sx={{ height: "100%", flexDirection: { xs: "row", md: "row-reverse" } }}>
                                        <UserPanelSpeedDial />
                                        <Grid xs={12} md={5} sx={{
                                            height: "95%",
                                        }} >
                                            <UserCard avatar={userLocalStorage?.avatar || ""}
                                                fullName={userLocalStorage?.fullName || ""}
                                                userName={userLocalStorage?.userName || ""}
                                                aboutMe={userLocalStorage?.aboutMe || ""} />
                                        </Grid>
                                        <Grid xs={12} md={7} sx={{}}>
                                            <Divider variant='middle' sx={{ mb: "50px" }} >
                                                <Chip label="اطلاعات تماس" variant="outlined" color="secondary" />
                                            </Divider>
                                            <ContactInformation contactInformation={contact} />
                                            <Divider variant='middle' sx={{ my: "50px" }} >
                                                <Chip label="اطلاعات فردی" variant="outlined" color="secondary" />
                                            </Divider>
                                            <PersonalInformation personalInformation={personal} />
                                            <Divider variant='middle' sx={{ my: "50px" }} >
                                                <Chip label="اطلاعات شغلی" variant="outlined" color="secondary" />
                                            </Divider>
                                            <JobInformation jobInformation={job} />
                                            <Divider variant='middle' sx={{ my: "50px" }} >
                                                <Chip label="اطلاعات لینک ها" variant="outlined" color="secondary" />
                                            </Divider>
                                            <LinksInformation linksInformation={links} />
                                        </Grid>
                                    </Grid >
                                </>
                        }
                    </>
                )
            }
        </>
    );
};

export default UserPanel;