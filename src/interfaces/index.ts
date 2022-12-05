import { gender, maritalStatus, ServiceStatus, EmploymentStatus, JobType } from "../helpers"

export interface IUser {
    id?: number,
    fullName: string,
    userName: string,
    avatar: string,
    password: string,
    aboutMe: string,
    me: string[],
    isShowResume: boolean,
    isAdmin: boolean,
    isDelete: boolean,
}

export interface IPassword {
    oldPassword: string,
    password: string,
    rePassword: string,
}

export interface IContact {
    id?: number,
    userId: number,
    address: string,
    mobile: string,
    email: string,
}

export interface IPersonal {
    id?: number,
    userId: number,
    birthDay: Date,
    maritalStatus: maritalStatus,
    gender: gender,
    serviceStatus: ServiceStatus
}

export interface IJob {
    id?: number,
    userId: number,
    EmploymentStatus: EmploymentStatus
    JobType: JobType
    EmploymentCities: string[]
}

export interface ILink {
    id?: number,
    userId: number,
    stackOverflow: string,
    gitHub: string,
    gitLab: string,
    linkdein: string,
}

export interface IWorkExperience {
    id?: number,
    userId: number,
    jobTitle: string,
    jobDescription: string,
    companyName: string,
    companyPhoto: string,
    startDate: Date,
    endDate: Date,
    jobTags: string[],
}

export interface ISkill {
    id?: number,
    userId: number,
    skillTitle: string,
    LevelProgress: number,
}
export interface ICertificate {
    id?: number,
    userId: number,
    certificateTitle: string,
    certificateDescription: string,
    nameOfInstitution: string,
    certificateLink: string,
    startDate: Date,
    endDate: Date,
    certificateTags: string[],
}

export interface IEducation {
    id?: number,
    userId: number,
    educationTitle: string,
    nameOfInstitution: string,
    educationDescription: string,
    average: string,
    startDate: Date,
    endDate: Date,
}

export interface IProject {
    id?: number,
    userId: number,
    projectTitle: string,
    projectDate: Date,
    projectLink: string,

}

export interface ISoftSkill {
    id?: number,
    userId: number,
    skillTitle: string,
    skillLevel: number
}

export interface ILanguage {
    id?: number,
    userId: number,
    languageTitle: string,
    languageLevel: number
}

export interface ILogin {
    userName: string,
    password: string,
}

export interface ILocalStorage {
    userId: number,
    fullName: string,
    userName: string,
    avatar: string,
    aboutMe: string,
    isAdmin: boolean,
    isDelete: boolean,
}

export interface IAchievementsColumn {
    field1: string,
    headerNameField1: string,
    field2: string,
    headerNameField2: string,
    headerNameFieldStartDate: string,
    headerNameFieldEndDate: string,
    messageEndDate: string,
    linkEdit: string,
}

export interface ISkillsAndLanguageColumn {
    field1: string,
    headerNameField1: string,
    field2: string,
    headerNameField2: string,
    linkEdit: string,
}