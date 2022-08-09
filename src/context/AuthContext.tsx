import { useDisclosure } from "@chakra-ui/react";
import { destroyCookie, parseCookies } from "nookies";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { api } from "../api/server";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface ICheckData {
  user: IUser;
}

interface IAuthContext {
  user: IUser;
  setUser: (user: IUser) => void;
  posts: Post[];
  setPosts: (posts: any) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  postEdit: Post;
  setPostEdit: (postEdit: any) => void;
  search: string;
  setSearch: (search: string) => void;
  isOpenEdit: boolean;
  onOpenEdit: () => void;
  onCloseEdit: () => void;
}

interface IAuthProvider {
  children: ReactNode;
}

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState({} as IUser);
  const [posts, setPosts] = useState([] as Post[]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [postEdit, setPostEdit] = useState({} as Post);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { token } = parseCookies();
      if (token) {
        try {
          const {
            data: { user },
          } = await api.get<ICheckData>("/users/check", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(user);
        } catch {
          destroyCookie(null, "token");
        }
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        isOpen,
        onOpen,
        onClose,
        postEdit,
        setPostEdit,
        search,
        setSearch,
        isOpenEdit,
        onOpenEdit,
        onCloseEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
