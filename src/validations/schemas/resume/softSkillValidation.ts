import * as Yup from "yup";

export const softSkillSchema = Yup.object().shape({
    userId: Yup.number().required(),
    skillTitle: Yup.string().required("عنوان مهارت نرم الزامی میباشد")
        .min(3, "عنوان مهارت نرم نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان مهارت نرم نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    skillLevel: Yup.number(),
});