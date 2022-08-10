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
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { onOpen, setSearch, loggout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" shadow="md" py={4} px="6">
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
            cursor="pointer"
            onClick={() => loggout()}
          >
            <AvatarBadge
              borderRadius="full"
              bg="red.500"
              color="white"
              px="0.2rem"
              py="1"
              fontWeight="semibold"
              right="-5px"
              
            >
              <AiOutlineLogout />
            </AvatarBadge>
          </Avatar>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
