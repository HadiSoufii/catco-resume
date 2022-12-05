import { FC } from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';

import { Label } from '../../core-ui/Label';

import NoPhoto from "../../assets/images/NoPhoto.jpg";

interface IProps {
    title: string,
    date: string,
    linkImageUrl?: string,
    subTitle?: string,
    gpa?: string,
    tags?: string[],
    nameInstitution?: string,
    description?: string,
}

const AchievementCard: FC<IProps> = ({ title, date, linkImageUrl, subTitle, gpa, tags, nameInstitution, description }) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    overflow: "hidden",
                    margin: "20px auto",
                    width: 1,
                }}
            >
                <Box sx={{ padding: "5px 0 0 5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Avatar src={linkImageUrl ? linkImageUrl : NoPhoto} alt="education" variant='circular'
                        sx={{ width: 70, height: "auto" }} />
                    {nameInstitution && <Label sx={{ mt: 1 }}>{nameInstitution}</Label>}
                </Box>
                <Box sx={{ width: "100%", padding: "6px" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant='subtitle1' fontWeight="bold">{title}</Typography>
                        <Label>{date}</Label>
                    </Box>
                    {subTitle && gpa ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                                mt: 1,
                            }}
                        >
                            <Typography variant='subtitle2' fontSize=".8rem" fontFamily="tanha">{subTitle}</Typography>
                            <Label>{`معدل ${gpa}`}</Label>
                        </Box>
                        :
                        <Box sx={{ display: "flex", mt: tags ? 2 : 0 }}>
                            {
                                tags?.map((item, index) => (
                                    <Label key={index} sx={{ mx: 1 }}>{item}</Label>
                                ))
                            }
                        </Box>
                    }
                    <Typography sx={{ mt: 1 }} fontSize=".8rem" textAlign="justify" >{description}</Typography>
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default AchievementCard;