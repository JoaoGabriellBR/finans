/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import notification from "../../utils/toast";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      const response = await api({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });
      setLoadingLogin(false);
      const { token } = response.data;
      Cookies.set("finans-authtoken", token);
      navigate("/dashboard");
    } catch (error: any) {
      setLoadingLogin(false);
      console.log(error.message);
      const errorMessage = error?.response?.data?.error;
      notification(toast, errorMessage, "error");
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Section>
          <Form>
            <Text mb="1.5rem" fontSize="3rem">
              Login
            </Text>
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
              onClick={handleLogin}
              disabled={!email || !password}
              mb="1.5rem"
              type="submit"
              width="100%"
              colorScheme="blue"
            >
              {loadingLogin ? "Entrando..." : "Entrar"}
            </Button>

            <Text fontSize="0.8rem">Não tem uma conta?</Text>
            <Text
              as="b"
              cursor="pointer"
              onClick={() => navigate("/register")}
              fontSize="0.8rem"
            >
              Cadastre-se aqui
            </Text>
          </Form>
        </Section>
      </Container>
    </>
  );
}
