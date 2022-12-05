import * as Yup from "yup";

export const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("کلمه عبور قبلی را وارد کنید"),
    password: Yup.string().required("کلمه عبور الزامی میباشد")
        .min(4, "کلمه عبور نمیتواند کمتر از 4 کاراکتر باشد")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d^\W]{1,}$/, "کلمه عبور آسان است، لطفا از اعداد و حروف انگیسی استفاده کنید")
    ,
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'تکرار کلمه عبور با کلمه عبور مغایرت دارد')
    ,
});