import { FC } from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { CircleOutlined as CircleOutlinedIcon, Circle as CircleIcon } from '@mui/icons-material';

interface IProps {
    name: string,
    value: number,
}

const RatingCircle: FC<IProps> = ({ name, value }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 4 }}>
            <Box>
                <Typography fontSize={20} >{name}</Typography>
            </Box>
            <Box sx={{ marginRight: { xs: 0, lg: "40px" } }}>
                <Rating value={value} max={4} readOnly
                    icon={<CircleIcon color='inherit' />}
                    emptyIcon={<CircleOutlinedIcon color='inherit' />}
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default RatingCircle;