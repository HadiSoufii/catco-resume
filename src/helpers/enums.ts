export enum ServiceStatus {
    None = "...",
    EndService = "پایان خدمت",
    PermanentExemption = "معافیت دائم",
    EducationPardon = "معافیت تحصیلی",
    Serving = "در حال خدمت",
    Included = "مشمول"
}

export enum EmploymentStatus {
    ActiveSearch = "در جستجوی فعال برای شغل جدید",
    Interested = "علاقه مند به شغل جدید اما نه خیلی پیگیر",
    NoWork = "اکنون به دنبال کار نیستم",
}

export enum JobType {
    FullTime = "تمام وقت",
    PartTime = "پاره وقت",
    Project = "پروژه ای"
}