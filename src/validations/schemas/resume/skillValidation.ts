import * as Yup from "yup";

export const skillSchema = Yup.object().shape({
    userId: Yup.number().required(),
    skillTitle: Yup.string().required("عنوان مهارت الزامی میباشد")
        .min(3, "عنوان مهارت نمیتواند کمتر از 3 کاراکتر باشد")
        .max(30, "عنوان مهارت نمیتواند بیشتر از 30 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    LevelProgress: Yup.number().required("سطح پیشرفت الزامی میباشد"),
});