import { useContext } from 'react';
import TreeView from '@mui/lab/TreeView';
import { Link } from 'react-router-dom';
import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowLeft as ArrowLeftIcon,
} from "@mui/icons-material";

import AdminDrawerMenuStyled from "./AdminDrawerMenuStyled";

import { treeItemsUser, treeItemsUserPanel, treeItemsResume } from "./../../../helpers";
import { AdminContext } from "../../../services/contexts";
import { Tooltip } from '@mui/material';


const AdminDrawerMenu = () => {

    const { drawerOpen } = useContext(AdminContext);

    return (
        <TreeView
            aria-label="drawer admin"
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowLeftIcon />}
        >
            {
                [...treeItemsUser, ...treeItemsUserPanel, ...treeItemsResume].map((item) =>
                (
                    <AdminDrawerMenuStyled key={item.nodeId} nodeId={item.nodeId} {...(drawerOpen ? { labelText: item.labelText } : {})} labelIcon={item.labelIcon}>
                        {
                            item.children?.map((itemChildren) => (
                                <Tooltip key={itemChildren.nodeId} title={itemChildren.labelText} placement="left">
                                    <Link to={itemChildren.link || "/"} style={{ textDecoration: "none" }}>
                                        <AdminDrawerMenuStyled
                                            nodeId={itemChildren.nodeId}
                                            {...(drawerOpen ? { labelText: itemChildren.labelText } : {})}
                                            labelIcon={itemChildren.labelIcon}
                                            color={itemChildren.color}
                                            bgColor={itemChildren.bgColor}
                                        />
                                    </Link>
                                </Tooltip>
                            ))
                        }
                    </AdminDrawerMenuStyled>
                )
                )
            }
        </TreeView>
    );
};

export default AdminDrawerMenu;