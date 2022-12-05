import {
    Login,
    Logout
} from "../pages";

import {
    AddUser, ChangePasswordUser, DeletedUsers, EditUser, ListUser,
} from "../pages/admin/user";

import {
    UserPanel, ContactInformation, PersonalInformation, JobInformation, LinksInformation, EditPassword, EditAccount,
} from "../pages/admin/userPanel";

import { ListWorkExperience, AddWorkExperience, EditWorkExperience } from "../pages/admin/resume/workExperience";
import { ListCertificate, AddCertificate, EditCertificate } from "../pages/admin/resume/certificate";
import { ListEducation, AddEducation, EditEducation } from "../pages/admin/resume/education";
import { ListSkill, AddSkill, EditSkill } from "../pages/admin/resume/skill";
import { ListProject, AddProject, EditProject } from "../pages/admin/resume/project";
import { ListSoftSkill, AddSoftSkill, EditSoftSkill } from "../pages/admin/resume/softSkill";
import { ListLanguage, AddLanguage, EditLanguage } from "../pages/admin/resume/language";

const userRoutes = [
    {
        path: '/admin/login',
        component: Login,
        private: false,
        isAdmin: false
    },
    {
        path: '/admin/Logout',
        component: Logout,
        private: false,
        isAdmin: false
    },
    {
        path: '/admin/users',
        component: ListUser,
        private: true,
        isAdmin: true
    },
    {
        path: '/admin/users/deletedUsers',
        component: DeletedUsers,
        private: true,
        isAdmin: true
    },
    {
        path: '/admin/users/addUser',
        component: AddUser,
        private: true,
        isAdmin: true
    },
    {
        path: '/admin/users/edituser/:userId',
        component: EditUser,
        private: true,
        isAdmin: true
    },
    {
        path: '/admin/users/changepassword/:userId',
        component: ChangePasswordUser,
        private: true,
        isAdmin: true
    },
];

const userPanelRoutes = [
    {
        path: '/admin/UserPanel',
        component: UserPanel,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/contactinformation',
        component: ContactInformation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/personalinformation',
        component: PersonalInformation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/jobinformation',
        component: JobInformation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/linksinformation',
        component: LinksInformation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/editaccount',
        component: EditAccount,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/UserPanel/editpassword',
        component: EditPassword,
        private: true,
        isAdmin: false
    },
];

const workExperienceRoutes = [
    {
        path: '/admin/resume/workExperiences',
        component: ListWorkExperience,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/workExperiences/addWorkExperience',
        component: AddWorkExperience,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/workExperiences/editWorkExperience/:workExperienceId',
        component: EditWorkExperience,
        private: true,
        isAdmin: true
    },
];

const certificateRoutes = [
    {
        path: '/admin/resume/certificates',
        component: ListCertificate,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/certificates/addCertificate',
        component: AddCertificate,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/certificates/editCertificate/:certificateId',
        component: EditCertificate,
        private: true,
        isAdmin: true
    },
];

const educationRoutes = [
    {
        path: '/admin/resume/educations',
        component: ListEducation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/educations/addEducation',
        component: AddEducation,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/educations/editEducation/:educationId',
        component: EditEducation,
        private: true,
        isAdmin: true
    },
];

const skillRoutes = [
    {
        path: '/admin/resume/skills',
        component: ListSkill,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/skills/addSkill',
        component: AddSkill,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/skills/editSkill/:skillId',
        component: EditSkill,
        private: true,
        isAdmin: true
    },
];

const projectRoutes = [
    {
        path: '/admin/resume/projects',
        component: ListProject,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/projects/addProject',
        component: AddProject,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/projects/editProject/:projectId',
        component: EditProject,
        private: true,
        isAdmin: true
    },
];

const softSkillRoutes = [
    {
        path: '/admin/resume/softSkills',
        component: ListSoftSkill,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/softSkills/addSoftSkill',
        component: AddSoftSkill,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/softSkills/editSoftSkill/:softSkillId',
        component: EditSoftSkill,
        private: true,
        isAdmin: true
    },
]

const languageRoutes = [
    {
        path: '/admin/resume/languages',
        component: ListLanguage,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/languages/addLanguage',
        component: AddLanguage,
        private: true,
        isAdmin: false
    },
    {
        path: '/admin/resume/languages/editLanguage/:languageId',
        component: EditLanguage,
        private: true,
        isAdmin: true
    },
]

const adminRoutes = [
    ...userRoutes,
    ...userPanelRoutes,
    ...workExperienceRoutes,
    ...certificateRoutes,
    ...educationRoutes,
    ...skillRoutes,
    ...projectRoutes,
    ...softSkillRoutes,
    ...languageRoutes
]

export { adminRoutes }