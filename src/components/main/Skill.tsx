import { FC, ReactNode } from 'react';
import { Box, Typography, LinearProgress, Badge } from "@mui/material";
import { Label } from "../../core-ui/Label"

interface IProps {
    name: string,
    value: number,
    children?: ReactNode
}

const Skill: FC<IProps> = ({ name, value, children }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
            {
                children ? children :
                    <>
                        <Box sx={{ minWidth: 100 }}>
                            <Label>{name}</Label>
                        </Box>
                        <Box sx={{ width: "100%", mx: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={value}
                                color="primary"
                                sx={{
                                    height: 10,
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography >
                                <Badge variant="standard" badgeContent={
                                    `${Math.round(value)}%`
                                } color="primary" sx={{ left: 20 }} />
                            </Typography>
                        </Box>
                    </>
            }
        </Box>
    );
};

export default Skill;