import { createTheme } from "@mui/material";

export const themeDark = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: "vazir, tanha, roboto"
    },
    palette: {
        mode: "dark",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiFormLabel-root.Mui-error": {
                        color: "#ab47bc",
                        "& .muirtl-125iqkp-MuiFormLabel-asterisk.Mui-error": {
                            color: "#ab47bc",
                        },
                    },
                    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ab47bc !important"
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                        color: "#ab47bc"
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                        borderColor: "#ab47bc"
                    },
                },
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { color: "secondary", variant: "contained" },
                    style: {
                        backgroundColor: "#ab47bc",
                        "&:hover": { backgroundColor: "#ce93d8" }
                    },
                },
            ],
        },
    }

});

export const themeLight = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: "vazir, tanha, roboto"
    },
    palette: {
        mode: "light",
    }
});