import * as Yup from "yup";

export interface RegisterFormValues {
    email: string;
    password: string;
}

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .max(100, "Email cannot exceed 100 characters")
        .required("Email is required"),

    password: Yup.string()
        .min(3, "Password must have at least 3 characters")
        .max(30, "Password cannot exceed 50 characters")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[0-9]/, "Password must have at least one number")
        // .matches(
        //     /[@$!%*?&#]/,
        //     "Password must have at least one special character"
        // )
        // .matches(/^\S*$/, "Password must not contain spaces")
        .required("Password is required"),
});
