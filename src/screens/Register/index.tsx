import { useState } from "react";
import Header from "../../components/Header";
import { Container, Section, Form } from "./styles";
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    setLoadingRegister(true);
    try {
      await api({
        method: "POST",
        url: "/user/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          email,
          password,
        },
      });

      setLoadingRegister(false);
      setName("");
      setEmail("");
      setPassword("");
      toast({
        title: "Conta criada com sucesso.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/login");
    } catch (error: any) {
      setLoadingRegister(false);
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
        <Header />
        <Section>
          <Form>
            <Text mb="1.5rem" fontSize="3rem">
              Cadastro
            </Text>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb="1.5rem" isRequired>
              <FormLabel>Senha:</FormLabel>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <Button
              onClick={handleCreateUser}
              disabled={!name || !email || !password}
              mb="1.5rem"
              type="submit"
              width="100%"
              colorScheme="blue"
            >
              {loadingRegister ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <Text fontSize="0.8rem">Já tem uma conta?</Text>
            <Text as='b' cursor="pointer" onClick={() => navigate("/login")} fontSize="0.8rem">
              Faça login aqui
            </Text>
          </Form>
        </Section>
      </Container>
    </>
  );
}
