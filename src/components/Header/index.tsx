import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { onOpen, setSearch } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" py={4} px="6">
      <Box maxW="1400px" mx="auto">
        <Flex
          alignItems="center"
          justify="space-between"
          fontSize="2xl"
          fontWeight="semibold"
          gap={4}
        >
          .DEV
          <Input
            maxW="800px"
            placeholder="Buscar uma publicação"
            borderRadius="lg"
            borderWidth="2px"
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <Button
            color="gray.500"
            bg="transparent"
            border="1px"
            borderColor="gray.200"
            _hover={{
              bg: "green.500",
              color: "gray.800",
            }}
            borderRadius="lg"
            onClick={onOpen}
          >
            <AiOutlinePlus />
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Avatar
            display={{ base: "none", md: "block" }}
            name="John Doe"
            src="https://itp.live/public/styles/full_img/public/images/2021/10/31/nftmonkey_3.png?Hv9WK--v"
            size="md"
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
