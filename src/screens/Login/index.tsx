/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from "react";
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
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import notification from "../../utils/toast";
import { inputFields } from "../../utils/inputFields";

export interface FormDataType {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormDataType) => {
    setFormData({ ...formData, [field]: e.target.value })
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClearForm = () => {
    setFormData({
      ...formData,
      email: "",
      password: ""
    })
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const response = await api({
        method: "POST",
        url: "/login",
        data: {
          email: formData.email,
          password: formData.password
        },
      });
      setLoadingLogin(false);
      const { token } = response.data;
      Cookies.set("finans-authtoken", token);
      handleClearForm();
      navigate("/dashboard");
    } catch (error: any) {
      setLoadingLogin(false);
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
            {inputFields?.slice(1).map((input) => (
              <FormControl mb="1.5rem" isRequired>
                <FormLabel>{input.label}</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#242424" as={input.icon} w={5} h={5} />
                  </InputLeftElement>
                  {input.id === "password" && (
                    <InputRightElement width="4rem" onClick={handleShowPassword}>
                      {showPassword ? (
                        <Icon as={BiHide} w={5} h={5} />
                      ) : (
                        <Icon as={BiShow} w={5} h={5} />
                      )}
                    </InputRightElement>
                  )}
                  <Input
                    border="1px"
                    borderColor="gray"
                    type={input.id === "password" ? showPassword ? "text" : "password" : input.type}
                    placeholder={input.placeholder}
                    value={formData[input.id as keyof FormDataType]}
                    onChange={(e) => handleChange(e, input.id as keyof FormDataType)}
                  />
                </InputGroup>
              </FormControl>
            ))}
            <Button
              onClick={handleLogin}
              disabled={!formData.email || !formData.password}
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
