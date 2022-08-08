import {
  Button,
  Container,
  FormControl,
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
import { setCookie } from "nookies";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../api/server";
import { AuthContext } from "../context/AuthContext";
import { ILoginCredentials, loginSchema } from "../utils/LoginValidation";

const Login: NextPage = () => {
  const toast = useToast();
  const { push } = useRouter();
  const { setUser } = useContext(AuthContext);

  const handleLogin: SubmitHandler<ILoginCredentials> = async (dataForm) => {
    try {
      const { data } = await api.post("/users/login", dataForm);
      toast({
        title: "Logado com sucesso!",
        status: "success",
      });
      setCookie(null, "token", data.token);
      setUser(data.user);
      push("/");
    } catch (error) {
      let errMessage = "Não foi possível Fazer o login";
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
  } = useForm<ILoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  console.log(errors);
  return (
    <Container
      maxW="600px"
      px="6"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minH="100vh"
    >
      <Heading mb="4">Entrar</Heading>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing="4">
          <FormControl isInvalid={!!errors.email}>
            <Input
              {...register("email")}
              placeholder="Email"
              type="text"
              variant="filled"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Input
              {...register("password")}
              placeholder="Password"
              type="password"
              variant="filled"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Entrar
          </Button>
        </Stack>
        <Text mt="4" textAlign="center">
          Não possui uma conta?{" "}
          <Link href="/register" color="blue.500">
            Registrar agora
          </Link>
        </Text>
      </form>
    </Container>
  );
};

export default Login;
