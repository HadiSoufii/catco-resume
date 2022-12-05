import { Typography, styled } from '@mui/material';

export const Label = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, padding: "5px", borderRadius: "30px", textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontSize: ".6rem"
}));