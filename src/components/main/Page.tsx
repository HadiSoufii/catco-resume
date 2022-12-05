import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface IProps {
    children: ReactNode,
    pageNumber: number,
    index: number,
}

const Page: FC<IProps> = ({ children, pageNumber, index }) => {

    return (
        <div
            role="tabpanel"
            hidden={pageNumber !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`sidebar-tab-${index}`}
        >
            {pageNumber === index && (
                <Box sx={{ height: "100vh", overflow: "hidden" }}>
                    {children}
                </Box>
            )
            }
        </div>
    );
};

export default Page;