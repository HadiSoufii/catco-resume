import { FC } from 'react';
import { Box, Typography, Divider } from '@mui/material';

import { Label } from '../../core-ui/Label';

interface IProps {
    title: string,
    nameInstitution: string,
    link?: string,
    date: string,
    tags?: string[],
    description?: string,
}

const CertificateCard: FC<IProps> = ({ title, nameInstitution, link, date, tags, description }) => {
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
                        <Label>{nameInstitution}</Label>
                    </Box>

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
                        <Box component="a" href={link} title={link ? title : "لینکی وجود ندارد"} fontSize=".8rem">مشاهده تصویر گواهی</Box>
                        <Label>{date}</Label>
                    </Box>

                    {tags &&
                        <Box sx={{ display: "flex", mt: 2 }}>
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

export default CertificateCard;