import { useState } from "react";
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
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineLeft,
  AiOutlineMail,
  AiOutlineLock,
  AiFillBank
} from "react-icons/ai";
import { RxExit, RxDashboard } from "react-icons/rx";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const previousPage = -1;
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <>
      <Container>
        <Header>
            <img onClick={() => navigate("/")} className="logo" alt="logo" src={logo} loading="lazy" />
          <Menu>
            <MenuButton>
              <Avatar w={10} h={10} bg="#3182CE" />
            </MenuButton>
            <Portal>
              <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Icon
                      as={AiOutlineUser}
                      w="1rem"
                      h="1rem"
                      color="#3182CE"
                    />
                    <Text ml="0.5rem" fontSize="1rem">
                      Meu Perfil
                    </Text>
                  </MenuItem>

                  <MenuItem onClick={() => navigate("/dashboard")}>
                    <Icon
                      as={RxDashboard}
                      w="1rem"
                      h="1rem"
                      color="#3182CE"
                    />
                    <Text ml="0.5rem" fontSize="1rem">
                      Dashboard
                    </Text>
                  </MenuItem>

                  <MenuItem onClick={() => navigate("/my-bills")}>
                    <Icon
                      as={AiFillBank}
                      w="1rem"
                      h="1rem"
                      color="#3182CE"
                    />
                    <Text ml="0.5rem" fontSize="1rem">
                      Minhas Contas
                    </Text>
                  </MenuItem>

                <MenuItem>
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
            <Icon onClick={() => navigate(previousPage)} cursor="pointer" as={AiOutlineLeft} mr="1rem" mt="0.6rem" />
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
                  />
                </InputGroup>
              </FormControl>

              <Button type="submit" width="100%" colorScheme="blue">
                Atualizar informações
              </Button>
            </div>
          </div>

          <div className="div-alterar-senha">
            <Text fontSize="1.5em">Alterar Senha</Text>
            <div className="div-form">
              <FormControl mb="1.5rem" isRequired>
                <FormLabel>Senha atual:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={AiOutlineLock} w={5} h={5} />
                  </InputLeftElement>
                  <InputRightElement width="4rem" onClick={handleShowPassword}>
                    {showPassword ? (
                      <Icon as={BiHide} w={5} h={5} />
                    ) : (
                      <Icon as={BiShow} w={5} h={5} />
                    )}
                  </InputRightElement>
                  <Input
                    border="1px"
                    borderColor="gray"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
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
                  />
                </InputGroup>
              </FormControl>

              <Button type="submit" width="100%" colorScheme="blue">
                Alterar senha
              </Button>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
