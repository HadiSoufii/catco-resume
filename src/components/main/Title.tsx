import { FC } from 'react';
import { CodeRounded } from '@mui/icons-material';
import { Chip, Divider, Typography } from '@mui/material';

interface IProps {
    textAlign?: "left" | "center" | "right" | undefined,
    titleText: string,
}

const Title: FC<IProps> = ({ textAlign, titleText }) => {
    return (
        <Divider textAlign={textAlign}
            sx={{
                "&::before, &::after": {
                    borderColor: "primary.main",
                },
                margin: {
                    xs: "0",
                    lg: "0 20px 0 -5px"
                },
            }}>
            <Chip color="primary" sx={{ p: 3 }}
                icon={<CodeRounded />}
                label={
                    <Typography variant="body1" sx={{ textAlign: "center" }} >
                        {titleText}
                    </Typography>
                } />
        </Divider>
    );
};

export default Title;