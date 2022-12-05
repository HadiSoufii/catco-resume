import { useEffect, useRef, useCallback, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import Typed from "typed.js"

import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

import { links2 } from "../../helpers";
import { MainContext } from '../../services/contexts';


const Home = () => {
    const { currentUser } = useContext(MainContext);
    const nameEl = useRef(null);
    const infoEl = useRef(null);
    const aboutMeEl = useRef(null);

    useEffect(() => {

        const typedName = new Typed(nameEl.current ? nameEl.current : "", {
            strings: [currentUser.fullName],
            typeSpeed: 50,
            backSpeed: 20,
            backDelay: 10,
            showCursor: false,
        });

        const typedInfo = new Typed(infoEl.current ? infoEl.current : "", {
            strings: currentUser.me,
            startDelay: 1500,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 50,
            loop: true,
            showCursor: false,
        });

        const typedAboutMe = new Typed(aboutMeEl.current ? aboutMeEl.current : "", {
            strings: [currentUser.aboutMe],
            typeSpeed: 100,
            backSpeed: 20,
            backDelay: 10,
            showCursor: false,
        });

        return () => {
            typedName.destroy();
            typedInfo.destroy();
            typedAboutMe.destroy();
        }

        // eslint-disable-next-line
    }, [currentUser]);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);

    }, []);

    const particlesLoaded = useCallback(async (container?: any | undefined) => {
        await console.log(container);
    }, []);

    return (
        <Box sx={{
            backgroundImage: `url(${require("../../assets/images/bg03.jpeg")})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
        }}>
            <Particles id='tsparticles' init={particlesInit} loaded={particlesLoaded} options={links2} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                pt: "50px",
                alignItems: "center",
            }}>
                <Typography ref={nameEl} variant="h3" color="primary.main"></Typography>
                <Typography ref={infoEl} variant="h4" color="primary.contrastText" sx={{
                    textDecoration: "underline",
                    textDecorationColor: "#1976d2"
                }}></Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                m: 1,
            }}>
                <Typography fontSize={20} ref={aboutMeEl} paragraph sx={{
                    textAlign: "justify", color: "whitesmoke",
                    borderBottom: (theme) => `3px solid ${theme.palette.primary.main}`
                }}>
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;