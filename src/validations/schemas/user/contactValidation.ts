import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
    address: Yup.string().required("آدرس الزامی میباشد")
        .min(3, "آدرس نمیتواند کمتر از 3 کاراکتر باشد")
        .max(40, "آدرس نمیتواند بیشتر از 40 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    mobile: Yup.string()
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "فرمت شماره موبایل صحیح نمیباشد"),
    email: Yup.string().required("آدرس ایمیل الزامی میباشد")
        .email("فرمت ایمیل معتبر نمیباشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
});
