import * as yup from "yup";

export const RegisterSchema = yup.object({
  name: yup.string().required("Nome é um campo obrigatório."),
  email: yup
    .string()
    .required("Email é um campo obrigatório.")
    .email("Email inválido."),
  password: yup.string().required("Senha é um campo obrigatório."),
});

export type IRegisterCredentials = yup.TypeOf<typeof RegisterSchema>;
