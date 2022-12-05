import { ElementType } from "react";
import { TreeItemProps } from "@mui/lab";
import { SvgIconProps } from "@mui/material";

export type maritalStatus = "متاهل" | "مجرد";
export type gender = "آقا" | "خانم";

export type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: ElementType<SvgIconProps>;
    labelText?: string;
};
