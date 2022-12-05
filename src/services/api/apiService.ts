import axios from "axios";
import {
    IUser, IContact, IPersonal, IJob, ILink,
    IWorkExperience, ICertificate, IEducation, ISkill, IProject, ISoftSkill, ILanguage
} from "../../interfaces";

const apiServer = axios.create({
    baseURL: "http://localhost:9000"
});

const users = {
    getUsers: async () => await apiServer.get<IUser[]>("/users"),
    getUserByUserId: async (userId: number) => await apiServer.get<IUser>(`/users/${userId}`),
    getUserByUserName: async (userName: string) => await apiServer.get<IUser[]>(`/users?userName=${userName}`),
    createUser: async (user: IUser) => await apiServer.post<IUser>("/users", user),
    updateUserByUserAndUserId: async (user: IUser, userId: number) =>
        await apiServer.put<IUser>(`/users/${userId}`, user),
    changePasswordByUserId: async (userId: number, password: string) => {
        const { data } = await users.getUserByUserId(userId);
        data.password = password;
        return await users.updateUserByUserAndUserId(data, userId)
    },
    deleteUserByUserId: async (userId: number) => {
        const { data } = await users.getUserByUserId(userId);
        data.isDelete = true;
        return await users.updateUserByUserAndUserId(data, userId);
    },
};

const contacts = {
    getContactByUserId: async (userId: number) => await apiServer.get<IContact[]>(`/contacts?userId=${userId}`),
    createContact: async (contact: IContact) => await apiServer.post<IContact>("/contacts", contact),
    updateContact: async (contactId: number, contact: IContact) =>
        await apiServer.put<IContact>(`/contacts/${contactId}`, contact),

};

const personals = {
    getPersonalByUserId: async (userId: number) => apiServer.get<IPersonal[]>(`/personals?userId=${userId}`),
    createPersonal: async (personal: IPersonal) => await apiServer.post<IPersonal>("/personals", personal),
    updatePersonal: async (personalId: number, personal: IPersonal) =>
        await apiServer.put<IContact>(`/personals/${personalId}`, personal),
};

const jobs = {
    getJobByUserId: async (userId: number) => apiServer.get<IJob[]>(`/jobs?userId=${userId}`),
    createJob: async (job: IJob) => await apiServer.post<IJob>("/jobs", job),
    updateJob: async (jobId: number, job: IJob) =>
        await apiServer.put<IContact>(`/jobs/${jobId}`, job),
};

const links = {
    getLinkByUserId: async (userId: number) => apiServer.get<ILink[]>(`/links?userId=${userId}`),
    createlink: async (links: ILink) => await apiServer.post<ILink>("/links", links),
    updatelink: async (linkId: number, links: ILink) =>
        await apiServer.put<ILink>(`/links/${linkId}`, links),
};

const workExperiences = {
    getAllWorkExperienceByUserId: async (userId: number) =>
        await apiServer.get<IWorkExperience[]>(`/workExperiences?userId=${userId}`),

    getWorkExperienceByWorkExperienceId: async (workExperienceId: number) =>
        await apiServer.get<IWorkExperience>(`/workExperiences/${workExperienceId}`),

    createWorkExperience: async (workExperience: IWorkExperience) =>
        await apiServer.post<IWorkExperience>("/workExperiences", workExperience),

    updateWorkExperience: async (workExperienceId: number, workExperience: IWorkExperience) =>
        await apiServer.put<IWorkExperience>(`/workExperiences/${workExperienceId}`, workExperience),

    deleteWorkExperience: async (workExperienceId: number) =>
        await apiServer.delete<IWorkExperience>(`/workExperiences/${workExperienceId}`),
};

const skills = {
    getAllSkillByUserId: async (userId: number) =>
        await apiServer.get<ISkill[]>(`/skills?userId=${userId}`),

    getSkillBySkillId: async (skillId: number) =>
        await apiServer.get<ISkill>(`/skills/${skillId}`),

    createSkill: async (skill: ISkill) =>
        await apiServer.post<ISkill>("/skills", skill),

    updateSkill: async (skillId: number, skill: ISkill) =>
        await apiServer.put<ISkill>(`/skills/${skillId}`, skill),

    deleteSkill: async (skillId: number) =>
        await apiServer.delete<ISkill>(`/skills/${skillId}`),
};

const certificates = {
    getAllCertificateByUserId: async (userId: number) =>
        await apiServer.get<ICertificate[]>(`/certificates?userId=${userId}`),

    getCertificateByCertificateId: async (certificateId: number) =>
        await apiServer.get<ICertificate>(`/certificates/${certificateId}`),

    createCertificate: async (certificate: ICertificate) =>
        await apiServer.post<ICertificate>("/certificates", certificate),

    updateCertificate: async (certificateId: number, certificate: ICertificate) =>
        await apiServer.put<ICertificate>(`/certificates/${certificateId}`, certificate),

    deleteCertificate: async (certificateId: number) =>
        await apiServer.delete<ICertificate>(`/certificates/${certificateId}`),
};

const educations = {
    getAllEducationByUserId: async (userId: number) =>
        await apiServer.get<IEducation[]>(`/educations?userId=${userId}`),

    getEducationByEducationId: async (educationId: number) =>
        await apiServer.get<IEducation>(`/educations/${educationId}`),

    createEducation: async (education: IEducation) =>
        await apiServer.post<IEducation>("/educations", education),

    updateEducation: async (educationId: number, education: IEducation) =>
        await apiServer.put<IEducation>(`/educations/${educationId}`, education),

    deleteEducation: async (educationId: number) =>
        await apiServer.delete<IEducation>(`/educations/${educationId}`),
};

const projects = {
    getAllProjectByUserId: async (userId: number) =>
        await apiServer.get<IProject[]>(`/projects?userId=${userId}`),

    getProjectByProjectId: async (projectId: number) =>
        await apiServer.get<IProject>(`/projects/${projectId}`),

    createProject: async (project: IProject) =>
        await apiServer.post<IProject>("/projects", project),

    updateProject: async (projectId: number, project: IProject) =>
        await apiServer.put<IProject>(`/projects/${projectId}`, project),

    deleteProject: async (projectId: number) =>
        await apiServer.delete<IProject>(`/projects/${projectId}`),
};

const softSkills = {
    getAllSoftSkillByUserId: async (userId: number) =>
        await apiServer.get<ISoftSkill[]>(`/softSkills?userId=${userId}`),

    getSoftSkillBySoftSkillId: async (softSkillId: number) =>
        await apiServer.get<ISoftSkill>(`/softSkills/${softSkillId}`),

    createSoftSkill: async (softSkill: ISoftSkill) =>
        await apiServer.post<ISoftSkill>("/softSkills", softSkill),

    updateSoftSkill: async (softSkillId: number, softSkill: ISoftSkill) =>
        await apiServer.put<ISoftSkill>(`/softSkills/${softSkillId}`, softSkill),

    deleteSoftSkill: async (softSkillId: number) =>
        await apiServer.delete<ISoftSkill>(`/softSkills/${softSkillId}`),
};

const languages = {
    getAllLanguageByUserId: async (userId: number) =>
        await apiServer.get<ILanguage[]>(`/languages?userId=${userId}`),

    getLanguageByLanguageId: async (languageId: number) =>
        await apiServer.get<ILanguage>(`/languages/${languageId}`),

    createLanguage: async (language: ILanguage) =>
        await apiServer.post<ILanguage>("/languages", language),

    updateLanguage: async (languageId: number, language: ILanguage) =>
        await apiServer.put<ILanguage>(`/languages/${languageId}`, language),

    deleteLanguage: async (languageId: number) =>
        await apiServer.delete<ILanguage>(`/languages/${languageId}`),
};



export {
    users, contacts, personals, jobs, links, workExperiences, skills, certificates,
    educations, projects, softSkills, languages
}
