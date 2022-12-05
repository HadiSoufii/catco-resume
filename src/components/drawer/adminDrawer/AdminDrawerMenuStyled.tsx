import { Box, Typography } from "@mui/material";
import { StyledTreeItemRoot } from "../../../core-ui/TreeMenu";
import { StyledTreeItemProps } from "./../../../helpers";

const AdminDrawerMenuStyled = (props: StyledTreeItemProps) => {
    const {
        bgColor,
        color,
        labelIcon,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={labelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
};

export default AdminDrawerMenuStyled;