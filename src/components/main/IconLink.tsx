import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface IProps {
    linkUrl: string,
    classNameIcon: string,
    children?: ReactNode,
}

const IconLink: FC<IProps> = ({ linkUrl, classNameIcon, children }) => {
    return (
        <>
            {
                children ? children :
                    <Box component="a" href={linkUrl} target="_blank"  >
                        <Box fontSize={30} className={classNameIcon} component="i"
                            sx={{
                                cursor: "pointer", backgroundColor: "primary.main",
                                padding: "15px", borderRadius: "50%", color: "primary.contrastText",
                                transition: "all .8s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "primary.main",
                                }
                            }}
                        ></Box>
                    </Box>
            }
        </>
    );
};

export default IconLink;