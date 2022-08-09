import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../api/server";
import { AuthContext } from "../../context/AuthContext";

const PostList = () => {
  const { token } = parseCookies();
  const { posts, setPosts, user, setPostEdit, onOpenEdit, search } =
    useContext(AuthContext);
  const toast = useToast();

  const filterdPosts =
    search.length > 0
      ? posts.filter((post) =>
          post.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase().trim())
        )
      : posts;

  const deletePost = async (id: number) => {
    try {
      const { token } = parseCookies();
      await api.delete(`/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      toast({
        title: "Publicação deletada",
        description: "Sua publicação foi deletada com sucesso",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao deletar publicação",
        description: "Não foi possível deletar a publicação",
        status: "error",
      });
    }
  };

  useEffect(() => {
    api
      .get("/posts/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: any) => {
        setPosts(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <Stack spacing={8}>
      {filterdPosts.map((post: any, index) => (
        <Center py={6} key={index}>
          <Box
            maxW={"800px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Stack>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                Tech
              </Text>
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {post.title}
              </Heading>
              <Text>{post.content}</Text>
            </Stack>
            <Stack
              display="flex"
              justifyContent="space-between"
              mt={6}
              direction={"row"}
              spacing={4}
              align={"center"}
            >
              <Box textAlign="center">
                <Avatar src="https://itp.live/public/styles/full_img/public/images/2021/10/31/nftmonkey_3.png?Hv9WK--v" />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text>{moment(post.createdAt, "YYYYMMDD").fromNow()}</Text>
                </Stack>
              </Box>
              {user.id === post.authorId && (
                <Stack>
                  <Button
                    onClick={() => {
                      setPostEdit(post);
                      onOpenEdit();
                    }}
                    color={"blue"}
                    variant={"solid"}
                  >
                    <AiFillEdit />
                  </Button>
                  <Button
                    onClick={() => deletePost(post.id)}
                    color={"red"}
                    variant={"solid"}
                  >
                    <AiFillDelete />
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        </Center>
      ))}
    </Stack>
  );
};

export default PostList;
