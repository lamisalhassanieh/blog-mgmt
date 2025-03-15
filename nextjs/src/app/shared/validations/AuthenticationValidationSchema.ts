import * as yup from "yup";

export const AuthenticationValidationSchema = yup.object({
    password: yup.string().required("Password is required"),
    username: yup.string().required("Username is required")
});