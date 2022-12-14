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

const ModalCreatePost = () => {
  const { isOpen, onClose, setPosts, posts, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { token } = parseCookies();
    try {
      await api.post(
        "/posts/create",
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
      toast({
        title: "Sucesso",
        description: "Publicação criada com sucesso!",
        status: "success",
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a publicação",
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
                onChange={({ target }: any) => setTitle(target.value)}
                placeholder="Qual o tema?"
              />
              {title.length > 20 && (
                <Text>Título muito longo, o limite é de 20 caracteres.</Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Conteúdo</FormLabel>
              <Textarea
                onChange={({ target }: any) => setContent(target.value)}
                placeholder="O que está pensando?"
              />
              <Text color="gray">
                Quantidade de caracteres: {content.length} / 255
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e: any) => handleSubmit(e)}
              colorScheme="blue"
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

export default ModalCreatePost;
