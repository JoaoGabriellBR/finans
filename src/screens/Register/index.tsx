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
import { inputFields } from "../../utils/inputFields"

export interface FormDataType {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
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
      name: "",
      email: "",
      password: "",
    });
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
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      setLoadingRegister(false);
      handleClearForm()
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
            {inputFields?.map((input) => (
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
                    type={input.id === 'password' ? showPassword ? "text" : "password" : input.type}
                    placeholder={input.placeholder}
                    value={formData[input.id as keyof FormDataType]}
                    onChange={(e) => handleChange(e, input.id as keyof FormDataType)}
                  />
                </InputGroup>
              </FormControl>
            ))}

            <Button
              onClick={handleCreateUser}
              disabled={!formData.name || !formData.email || !formData.password}
              mb="1.5rem"
              type="submit"
              width="100%"
              colorScheme="blue"
            >
              {loadingRegister ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <Text fontSize="0.8rem">Já tem uma conta?</Text>
            <Text
              as="b"
              cursor="pointer"
              onClick={() => navigate("/login")}
              fontSize="0.8rem"
            >
              Faça login aqui
            </Text>
          </Form>
        </Section>
      </Container>
    </>
  );
}
