import { useEffect, useContext, useState } from "react";
import { Card, CardContent, Grow, Box, Skeleton } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jMoment from "moment-jalaali";


import { Title, PortfolioCard } from "../../components/main";
import { NoContent } from "../../components";

import { IProject } from '../../interfaces';
import { MainContext } from "../../services/contexts";
import { projects as projectApi } from '../../services/api/apiService';

const Portfolio = () => {
    const navigate = useNavigate();
    const { currentUser, loadingPage, setLoadingPage } = useContext(MainContext);

    const [checked, setChecked] = useState<boolean>(false);
    const [portfolio, setPortfolio] = useState<IProject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPage(true);

                const { status: statusProjects, data: dataProjects } = await projectApi.getAllProjectByUserId(currentUser.id || 0);
                if (statusProjects === 200 && dataProjects.length > 0) {
                    setPortfolio(dataProjects)
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

    return (
        <Card sx={{
            height: "100vh",
            overflowY: "scroll"
        }}>
            <CardContent>
                <Grid container sx={{ mx: 3 }} spacing={3} >
                    <Grid xs={12}>
                        <Title textAlign='left' titleText='نمونه کار ها' />
                    </Grid>
                    {
                        loadingPage ? <Skeleton variant="rectangular" animation="wave" width="100%" height={250} sx={{ mt: 3 }} /> :
                            portfolio.length > 0 ?
                                portfolio.map((item, index) => (
                                    <Grow key={item.id} timeout={1000 * (index + 1)} in={checked}>
                                        <Grid xs={12} md={6} xl={4} height={250}>
                                            <PortfolioCard name={item.projectTitle} date={jMoment(item.projectDate).format('jD jMMMM jYYYY')}
                                                link={item.projectLink} />
                                        </Grid>
                                    </Grow>
                                ))
                                : <Box sx={{ margin: "20px auto" }}><NoContent color="primary.main" /></Box>
                    }
                </Grid>
            </CardContent>
        </Card >
    );
};

export default Portfolio;