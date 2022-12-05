import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ContentPasteOff as ContentPasteOffIcon } from '@mui/icons-material';

const NoContent: FC<{ color?: string }> = ({ color }) => {
    return (
        <Box sx={{ height: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ContentPasteOffIcon sx={{ fontSize: 70, color: color ? color : "warning.main" }} />
            <Typography paragraph color={color && color}>
                هیچ محتوایی برای نشان دادن وجود ندارد
            </Typography>
        </Box>
    );
};

export default NoContent;