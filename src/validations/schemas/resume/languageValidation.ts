import * as Yup from "yup";

export const languageSchema = Yup.object().shape({
    userId: Yup.number().required(),
    languageTitle: Yup.string().required("نام زبان الزامی میباشد")
        .min(3, "نام زبان نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "نام زبان نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    languageLevel: Yup.number().required("سطح پیشرفت الزامی میباشد"),
});