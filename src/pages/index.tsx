import { Container } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { api } from "../api/server";
import Header from "../components/Header";
import ModalCreatePost from "../components/ModalCreatePost";
import ModalEditPost from "../components/ModalEditPost";
import PostList from "../components/PostList";
import { redirectLogin } from "../utils/redirectLogin";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container
        maxW="1400px"
        px="6"
        display="flex"
        flexDirection="column"
        minH="100vh"
      >
        <ModalCreatePost />
        <ModalEditPost />
        <PostList />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (token) {
    try {
      await api.get("/users/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        props: {},
      };
    } catch {
      return redirectLogin();
    }
  }
  return redirectLogin();
};

export default Home;
