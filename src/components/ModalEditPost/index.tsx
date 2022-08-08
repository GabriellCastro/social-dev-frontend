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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { api } from "../../api/server";
import { AuthContext } from "../../context/AuthContext";

const ModalEditPost = () => {
  const { isOpen, onClose, setPosts, posts, user, postEdit } =
    useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { token } = parseCookies();
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
      onClose();
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar uma publicação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                defaultValue={postEdit.title}
                onChange={({ target }: any) => setTitle(target.value)}
                placeholder="Qual o tema?"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Conteúdo</FormLabel>
              <Textarea
                defaultValue={postEdit.content}
                onChange={({ target }: any) => setContent(target.value)}
                placeholder="O que está pensando?"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e: any) => handleSubmit(e)}
              colorScheme="green"
              mr={3}
            >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditPost;
