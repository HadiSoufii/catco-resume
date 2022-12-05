import * as Yup from "yup";

export const personalSchema = Yup.object().shape({
    birthDay: Yup.date().required("تاریخ تولد الزامی میباشد"),
    maritalStatus: Yup.string().required("وضعیت تاهل مشخص کنید"),
    gender: Yup.string().required("وضعیت جنسیت مشخص کنید"),
    serviceStatus: Yup.string(),
});