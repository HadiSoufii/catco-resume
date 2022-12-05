import { ElementType } from "react";
import { SvgIconProps } from "@mui/material";

import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    PersonOff as PersonOffIcon,
    SupervisorAccount as SupervisorAccountIcon,
    ManageAccounts as ManageAccountsIcon,
    PermIdentity as PermIdentityIcon,
    AccountBox as AccountBoxIcon,
    ContactPhone as ContactPhoneIcon,
    ContactPage as ContactPageIcon,
    ContactEmergency as ContactEmergencyIcon,
    DatasetLinked as DatasetLinkedIcon,
    VpnKey as VpnKeyIcon,
    PermContactCalendar as PermContactCalendarIcon,
    NoteAlt as NoteAltIcon,
    School as SchoolIcon,
    Engineering as EngineeringIcon,
    WorkspacePremium as WorkspacePremiumIcon,
    WorkHistory as WorkHistoryIcon,
    Brightness7 as Brightness7Icon,
    GTranslate as GTranslateIcon,
} from "@mui/icons-material";

interface ITreeItems {
    nodeId: string,
    labelText: string,
    labelIcon: ElementType<SvgIconProps<"svg", {}>>;
    link?: string,
    color?: string,
    bgColor?: string,
    children?: ITreeItems[],
}

export const treeItemsUser: ITreeItems[] = [
    {
        nodeId: "1",
        labelText: "مدیریت کاربران",
        labelIcon: AdminPanelSettingsIcon,
        children: [
            {
                nodeId: "4",
                labelText: "لیست کاربران",
                labelIcon: SupervisorAccountIcon,
                link: "/admin/users",
                color: "#1a73e8",
                bgColor: "#e8f0fe",
            },
            {
                nodeId: "5",
                labelText: "کاربران حذف شده",
                labelIcon: PersonOffIcon,
                link: "/admin/users/deletedusers",
                color: "#e3742f",
                bgColor: "#fcefe3",
            },
        ]
    },
];

export const treeItemsUserPanel: ITreeItems[] = [
    {
        nodeId: "2",
        labelText: "پنل کاربری",
        labelIcon: ManageAccountsIcon,
        children: [
            {
                nodeId: "6",
                labelText: "اطلاعات من",
                labelIcon: PermIdentityIcon,
                link: "/admin/userpanel",
                color: "#e3742f",
                bgColor: "#fcefe3",
            },
            {
                nodeId: "7",
                labelText: "ویرایش حساب",
                labelIcon: AccountBoxIcon,
                link: "/admin/userpanel/editaccount",
                color: "#a250f5",
                bgColor: "#f3e8fd",
            },
            {
                nodeId: "8",
                labelText: "اطلاعات تماس",
                labelIcon: ContactPhoneIcon,
                link: "/admin/userpanel/contactinformation",
                color: "#3c8039",
                bgColor: "#e6f4ea",
            },
            {
                nodeId: "9",
                labelText: "اطلاعات فردی",
                labelIcon: ContactPageIcon,
                link: "/admin/userpanel/personalinformation",
                color: "#1a73e8",
                bgColor: "#e6f4ea",
            },
            {
                nodeId: "10",
                labelText: "اطلاعات شغلی",
                labelIcon: ContactEmergencyIcon,
                link: "/admin/userpanel/jobinformation",
                color: "#424242",
                bgColor: "#eeeeee",
            },
            {
                nodeId: "11",
                labelText: "لینک ها",
                labelIcon: DatasetLinkedIcon,
                link: "/admin/userpanel/linksinformation",
                color: "#00695c",
                bgColor: "#80cbc4",
            },
            {
                nodeId: "12",
                labelText: "ویرایش پسورد",
                labelIcon: VpnKeyIcon,
                link: "/admin/userpanel/editpassword",
                color: "#9e9d24",
                bgColor: "#e6ee9c",
            },
        ]
    },
]

export const treeItemsResume: ITreeItems[] = [
    {
        nodeId: "3",
        labelText: "رزومه من",
        labelIcon: PermContactCalendarIcon,
        children: [
            {
                nodeId: "13",
                labelText: "سوابق کاری",
                labelIcon: NoteAltIcon,
                link: "/admin/resume/workExperiences",
                color: "#e3742f",
                bgColor: "#fcefe3",
            },
            {
                nodeId: "14",
                labelText: "تحصیلات",
                labelIcon: SchoolIcon,
                link: "/admin/resume/educations",
                color: "#a250f5",
                bgColor: "#f3e8fd",
            },
            {
                nodeId: "15",
                labelText: "مهارت ها",
                labelIcon: EngineeringIcon,
                link: "/admin/resume/skills",
                color: "#3c8039",
                bgColor: "#e6f4ea",
            },
            {
                nodeId: "16",
                labelText: "افتخارات",
                labelIcon: WorkspacePremiumIcon,
                link: "/admin/resume/certificates",
                color: "#1a73e8",
                bgColor: "#e6f4ea",
            },
            {
                nodeId: "17",
                labelText: "نمونه کارها",
                labelIcon: WorkHistoryIcon,
                link: "/admin/resume/projects",
                color: "#424242",
                bgColor: "#eeeeee",
            },
            {
                nodeId: "18",
                labelText: "مهارت های نرم",
                labelIcon: Brightness7Icon,
                link: "/admin/resume/softSkills",
                color: "#00695c",
                bgColor: "#80cbc4",
            },
            {
                nodeId: "19",
                labelText: "زبان ها",
                labelIcon: GTranslateIcon,
                link: "/admin/resume/languages",
                color: "#9e9d24",
                bgColor: "#e6ee9c",
            },
        ]
    },
]