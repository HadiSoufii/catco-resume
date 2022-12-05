import * as Yup from "yup";

export const employmentRecordSchema = Yup.object().shape({
    userId: Yup.number().required(),
    jobTitle: Yup.string().required("عنوان شغل الزامی میباشد")
        .min(3, "عنوان شغل نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان شغل نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    jobDescription: Yup.string()
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    companyName: Yup.string().required("نام شرکت الزامی میباشد")
        .min(3, "نام شرکت نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "نام شرکت نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    companyPhoto: Yup.string().url("آدرس معتبر نیست"),
    startDate: Yup.date().required("تاریخ شروع کار الزامی میباشد"),
    endDate: Yup.date(),
    jobTags: Yup.array<string[]>(),
});
