import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    fullName: Yup.string().required("نام و نام خانوادگی الزامی میباشد")
        .matches(/^[ا-ی ]*$/, "نام و نام خانوادگی باید با حروف فارسی باشد")
        .min(3, "نام و نام خانوادگی نمیتواند کمتر از 3 کاراکتر باشد")
        .max(20, "نام و نام خانوادگی نمیتواند بیشتر از 20 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    userName: Yup.string().required("نام کاربری الزامی میباشد")
        .min(3, "نام کاربری نمیتواند کمتر از 3 کاراکتر باشد")
        .max(20, "نام کاربری نمیتواند بیتشر از 20 کاراکتر باشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .matches(/^([A-Za-z])([A-Za-z0-9_.-]{2,})$/, "نام کاربری فقط شامل حروف انگلیسی و اعداد و ( _ - . ) میباشد و کاراکتر اول آن باید با حروف انگلیسی باشد")
        .strict(true),
    avatar: Yup.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی میباشد"),
    password: Yup.string().required("کلمه عبور الزامی میباشد")
        .min(4, "کلمه عبور نمیتواند کمتر از 4 کاراکتر باشد")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d^\W]{1,}$/, "کلمه عبور آسان است، لطفا از اعداد و حروف انگیسی استفاده کنید")
    ,
    aboutMe: Yup.string()
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    me: Yup.array<string[]>()
        .min(1, "حداقل یک متن برای توصیف خود بنویسید"),
    isAdmin: Yup.boolean(),
    isShowResume: Yup.boolean(),
});
