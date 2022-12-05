import * as Yup from "yup";

export const projectSchema = Yup.object().shape({
    userId: Yup.number().required(),
    projectTitle: Yup.string().required("عنوان پروژه الزامی میباشد")
        .min(3, "عنوان پروژه نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان پروژه نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    projectDate: Yup.date().required("تاریخ شروع پروژه الزامی میباشد"),
    projectLink: Yup.string().url("آدرس معتبر نیست").required("آدرس لینک پروژه الزامی میباشد"),
});
