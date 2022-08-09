import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { api } from "../../api/server";
import { AuthContext } from "../../context/AuthContext";

const ModalEditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isOpenEdit, onCloseEdit, setPosts, posts, user, postEdit } =
    useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { token } = parseCookies();
    if (!title) setTitle(postEdit.title);
    if (!content) setContent(postEdit.content);

    try {
      await api.put(
        `/posts/edit/${postEdit.id}`,
        {
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newPosts = [{ title, content, authorId: user.id }, ...posts];
      setPosts(newPosts);
      onCloseEdit();
      document.location.reload();
      toast({
        title: "Sucesso",
        description: "Publicação editada com sucesso!",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Não foi possível editar a publicação",
        status: "error",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar uma publicação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                defaultValue={postEdit.title}
                onChange={({ target }: any) => {
                  title?.length > 0
                    ? setTitle(target.value)
                    : setTitle(postEdit.title);
                }}
                placeholder="Qual o tema?"
              />
              {postEdit.title?.length > 20 && (
                <p>Título muito longo, o limite é de 20 caracteres.</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Conteúdo</FormLabel>
              <Textarea
                defaultValue={postEdit.content}
                onChange={({ target }: any) => {
                  content?.length > 0
                    ? setContent(target.value)
                    : setContent(postEdit.content);
                }}
                placeholder="O que está pensando?"
              />
              <Text color="gray">
                Quantidade de caracteres: {postEdit.content?.length} / 255
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={(e: any) => handleSubmit(e)}
              colorScheme="green"
              mr={3}
            >
              Salvar
            </Button>
            <Button onClick={onCloseEdit}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditPost;
