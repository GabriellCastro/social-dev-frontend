import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input, Stack, useColorMode } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

export const Search: React.FC = () => {
  const { onOpen, setSearch } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      direction="row"
      spacing={4}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      mt={8}
    >
      <Input
        maxW="900px"
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
    </Stack>
  );
};
