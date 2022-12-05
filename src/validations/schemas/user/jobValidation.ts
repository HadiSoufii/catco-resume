import * as Yup from "yup";

export const jobSchema = Yup.object().shape({
    EmploymentStatus: Yup.string().required("وضعیت اشتغال را مشخص کنید"),
    JobType: Yup.string().required("نوع شغل مورد نظر را مشخص کنید"),
    EmploymentCities: Yup.array<string[]>()
        .min(1, "حداقل یک شهر را مشخص کنید"),
});