import * as Yup from "yup";

export const certificateSchema = Yup.object().shape({
    userId: Yup.number().required(),
    certificateTitle: Yup.string().required("عنوان گواهی الزامی میباشد")
        .min(3, "عنوان گواهی نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان گواهی نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    certificateDescription: Yup.string()
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    nameOfInstitution: Yup.string().required("نام موسسه الزامی میباشد")
        .min(3, "نام موسسه نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "نام موسسه نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    certificateLink: Yup.string().url("آدرس معتبر نیست"),
    startDate: Yup.date().required("تاریخ صدور گواهی الزامی میباشد"),
    endDate: Yup.date(),
    certificateTags: Yup.array<string[]>(),
});