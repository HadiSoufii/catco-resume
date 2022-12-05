import { FC, ReactNode } from "react";
import { Typography, Box } from "@mui/material";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";

const DevInfo: FC<{ children: ReactNode }> = ({ children }) => {
    const [text, value] = children?.toString().split(":") || [];
    return (
        <Typography
            variant="body1"
            textAlign="left"
            {
            ...(children?.toString() === "[object Object]" ? { sx: { mt: 2, display: "flex", alignItems: "flex-end" } } : { sx: { mt: 2, } })
            }
        >
            <KeyboardArrowLeftRounded
                sx={{
                    verticalAlign: "bottom",
                    color: "primary.main",
                }}
            />
            {
                children?.toString() === "[object Object]" ? children :
                    <>
                        {`${text}`}
                        {value && " : "}
                        <Box component="b" fontFamily="tanha" >{value && value.replace(",", "")}</Box>
                    </>
            }
        </Typography >
    );
};

export default DevInfo;