import {
  Button,
  Container,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../api/server";
import {
  IRegisterCredentials,
  RegisterSchema,
} from "../utils/RegisterValidation";

const Register: NextPage = () => {
  const toast = useToast();
  const { push } = useRouter();

  const handleRegister: SubmitHandler<IRegisterCredentials> = async (data) => {
    try {
      await api.post("/users/register", data);
      toast({
        title: "Registro feito com sucesso!",
        status: "success",
      });
      push("/login");
    } catch (error) {
      let errMessage = "Não foi possível registrar o usuário";
      if (error instanceof AxiosError) {
        errMessage = error.response?.data?.message ?? errMessage;
      }
      toast({
        title: errMessage,
        status: "error",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterCredentials>({
    resolver: yupResolver(RegisterSchema),
  });

  return (
    <Container
      maxW="600px"
      px="6"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minH="100vh"
    >
      <Heading mb="4">Registar</Heading>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Stack spacing="4">
          <Input
            {...register("name")}
            placeholder="Name"
            type="text"
            variant="filled"
          />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
          <Input
            {...register("email")}
            placeholder="Email"
            type="text"
            variant="filled"
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
            variant="filled"
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
          <Button type="submit" colorScheme="blue">
            Registrar
          </Button>
        </Stack>
        <Text mt="4" textAlign="center">
          Possui uma conta?{" "}
          <Link href="/login" color="blue.500">
            Entre agora
          </Link>
        </Text>
      </form>
    </Container>
  );
};

export default Register;
