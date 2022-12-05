import * as Yup from "yup";

export const educationSchema = Yup.object().shape({
    userId: Yup.number().required(),
    educationTitle: Yup.string().required("رشته تحصیلی الزامی میباشد")
        .min(3, "عنوان رشته تحصیلی نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان رشته تحصیلی نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    educationDescription: Yup.string()
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    nameOfInstitution: Yup.string().required("نام مرکز تحصیلی الزامی میباشد")
        .min(3, "نام مرکز تحصیلی نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "نام مرکز تحصیلی نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    average: Yup.string().required("معدل الزامی میباشد")
        .matches(/[0-9.]/, "لطفا از فرمت صحیح اعداد استفاده کنید")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    startDate: Yup.date().required("تاریخ شروع تحصیل الزامی میباشد"),
    endDate: Yup.date(),
    certificateTags: Yup.array<string[]>(),
});