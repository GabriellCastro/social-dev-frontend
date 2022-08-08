import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email é um campo obrigatório.")
    .email("Email inválido."),
  password: yup.string().required("Senha é um campo obrigatório."),
});

export type ILoginCredentials = yup.TypeOf<typeof loginSchema>;
