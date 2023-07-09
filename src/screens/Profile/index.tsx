/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Container, Header, Section } from "./styles";
import logo from "../../assets/logo.png";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
  Avatar,
  Portal,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineLeft,
  AiOutlineMail,
  AiOutlineLock,
  AiFillBank,
} from "react-icons/ai";
import { RxExit, RxDashboard } from "react-icons/rx";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import handleLogout from "../../utils/handleLogout";
import Cookies from "js-cookie";
import api from "../../api";

type UserData = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

export default function Profile() {
  const isAuthenticated = () => !!Cookies.get("finans-authtoken");
  const navigate = useNavigate();
  const previousPage = -1;

  const toast = useToast();

  const [loadingUpdateUser, setLoadingUpdateUser] = useState<boolean>(false);
  const [loadingChangePassword, setLoadingChangePassword] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData | undefined>();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const loadUserData = async () => {
    const response = await api({
      method: "GET",
      url: "/user/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("finans-authtoken"),
      },
    });

    setUserData(response.data);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleUpdateUser = async () => {
    setLoadingUpdateUser(true);

    try {
      await api({
        method: "PATCH",
        url: `/user/update/${userData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          name: userData?.name,
          email: userData?.email,
        },
      });
      setLoadingUpdateUser(false);
      const successMessage = "Usuário atualizado com sucesso";
      toast({
        description: successMessage,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      setLoadingUpdateUser(false);
      const errorMessage = error?.response?.data?.error;
      toast({
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChangePassword = async () => {
    setLoadingChangePassword(true);

    try {
      await api({
        method: "PATCH",
        url: `/user/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          oldPassword,
          newPassword,
        },
      });
      setLoadingUpdateUser(false);
      const successMessage = "Senha atualizada com sucesso.";
      toast({
        description: successMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      setLoadingUpdateUser(false);
      const errorMessage = error?.response?.data?.error;
      toast({
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Container>
        <Header>
          <img
            onClick={() => isAuthenticated() ? navigate("/dashboard") : navigate("/")}
            className="logo"
            alt="logo"
            src={logo}
            loading="lazy"
          />
          <Menu>
            <MenuButton>
              <Avatar w={10} h={10} bg="#3182CE" />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={() => navigate("/profile")}>
                  <Icon as={AiOutlineUser} w="1rem" h="1rem" color="#3182CE" />
                  <Text ml="0.5rem" fontSize="1rem">
                    Meu Perfil
                  </Text>
                </MenuItem>

                <MenuItem onClick={() => navigate("/dashboard")}>
                  <Icon as={RxDashboard} w="1rem" h="1rem" color="#3182CE" />
                  <Text ml="0.5rem" fontSize="1rem">
                    Dashboard
                  </Text>
                </MenuItem>

                <MenuItem onClick={() => navigate("/my-bills")}>
                  <Icon as={AiFillBank} w="1rem" h="1rem" color="#3182CE" />
                  <Text ml="0.5rem" fontSize="1rem">
                    Minhas Contas
                  </Text>
                </MenuItem>

                <MenuItem onClick={() => handleLogout(navigate)}>
                  <Icon as={RxExit} w="1rem" h="1rem" color="#3182CE" />
                  <Text ml="0.5rem" fontSize="1rem">
                    Sair
                  </Text>
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Header>

        <Section>
          <div className="div-meu-perfil">
            <Icon
              onClick={() => navigate(previousPage)}
              cursor="pointer"
              as={AiOutlineLeft}
              mr="1rem"
            />
            <Text fontSize="1.5rem">Meu Perfil</Text>
          </div>

          <div className="div-dados-pessoais">
            <Text fontSize="1.5rem">Dados Pessoais</Text>

            <div className="div-form">
              <FormControl mb="1.5rem" isRequired>
                <FormLabel>Nome:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={AiOutlineUser} w={5} h={5} />
                  </InputLeftElement>
                  <Input
                    border="1px"
                    borderColor="gray"
                    type="text"
                    placeholder="José Silva"
                    value={userData?.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl mb="1.5rem" isRequired>
                <FormLabel>E-mail:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={AiOutlineMail} w={5} h={5} />
                  </InputLeftElement>
                  <Input
                    border="1px"
                    borderColor="gray"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <Button
                onClick={handleUpdateUser}
                type="submit"
                width="100%"
                colorScheme="blue"
              >
                {loadingUpdateUser
                  ? "Atualizando informações..."
                  : "Atualizar informações"}
              </Button>
            </div>
          </div>

          <div className="div-alterar-senha">
            <Text fontSize="1.5em">
              {loadingChangePassword ? "Alterando senha..." : "Alterar senha"}
            </Text>
            <div className="div-form">
              <FormControl mb="1.5rem" isRequired>
                <FormLabel>Senha atual:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={AiOutlineLock} w={5} h={5} />
                  </InputLeftElement>
                  <InputRightElement
                    width="4rem"
                    onClick={handleShowOldPassword}
                  >
                    {showOldPassword ? (
                      <Icon as={BiHide} w={5} h={5} />
                    ) : (
                      <Icon as={BiShow} w={5} h={5} />
                    )}
                  </InputRightElement>
                  <Input
                    border="1px"
                    borderColor="gray"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="********"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mb="1.5rem" isRequired>
                <FormLabel>Nova Senha:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={AiOutlineLock} w={5} h={5} />
                  </InputLeftElement>
                  <InputRightElement
                    width="4rem"
                    onClick={handleShowNewPassword}
                  >
                    {showNewPassword ? (
                      <Icon as={BiHide} w={5} h={5} />
                    ) : (
                      <Icon as={BiShow} w={5} h={5} />
                    )}
                  </InputRightElement>
                  <Input
                    border="1px"
                    borderColor="gray"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <Button
                onClick={handleChangePassword}
                type="submit"
                width="100%"
                colorScheme="blue"
              >
                {loadingChangePassword ? "Alterando senha..." : "Alterar senha"}
              </Button>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
