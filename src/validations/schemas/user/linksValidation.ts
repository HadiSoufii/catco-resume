import * as Yup from "yup";

export const linksSchema = Yup.object().shape({
    stackOverflow: Yup.string().url("لطفا آدرس اینترنتی قرار دهید"),
    gitHub: Yup.string().url("لطفا آدرس اینترنتی قرار دهید"),
    gitable: Yup.string().url("لطفا آدرس اینترنتی قرار دهید"),
    linkdein: Yup.string().url("لطفا آدرس اینترنتی قرار دهید"),
});