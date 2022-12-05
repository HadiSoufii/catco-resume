import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface IProps {
    name: string,
    date: string,
    link: string,
}

const PortfolioCard: FC<IProps> = ({ name, date, link }) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(45deg, rgba(90, 104, 113, 0.700), rgba(39, 106, 178, 0.700)),
                                            url(${require("../../assets/images/bgCard.jpg")}) no-repeat center center / cover`,
                boxShadow: "5px 5px 15px 0px rgb(7 7 7 / 50%)",
                overflow: "hidden",
                height: 1,
                mt: 4
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 1,
                    height: 1,
                    transition: "0.5s",
                    cursor: "pointer",
                    "&:hover~.image__content": {
                        opacity: 1,
                        visibility: "visible",
                        transform: "scale(100%)"
                    }
                }}
                component="a"
                href={link}
                target="_blank"
            />
            <Box
                className="image__content"
                sx={{
                    zIndex: 1,
                    padding: "5px",
                    textAlign: "center",
                    fontSize: "30px",
                    lineHeight: "1.4",
                    opacity: "0",
                    visibility: "hidden",
                    boxSizing: "borderBox",
                    pointerEvents: "none",
                    background: "linear-gradient(45deg, rgba(90, 104, 113, 0.700), rgba(39, 106, 178, 0.700))",
                    display: "flex",
                    width: 1,
                    height: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "scale(0%)",
                    transition: "all 1s ease-in-out",
                }}
            >
                <Typography variant="h4" fontFamily="tanha" color="primary.contrastText">{name}</Typography>
                <Typography paragraph fontFamily="tanha" color="primary.contrastText">{date}</Typography>
            </Box>
        </Box>
    );
};

export default PortfolioCard;