import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    userName: Yup.string().required("نام کاربری الزامی میباشد")
        .trim('فضا های خالی را از  ابتدا و انتها پاک کنید')
        .strict(true),
    password: Yup.string().required("کلمه عبور الزامی میباشد"),
});