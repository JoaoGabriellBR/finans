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
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Register() {
  
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
                />
              </InputGroup>
            </FormControl>

            <Button mb="1.5rem" type="submit" width="100%" colorScheme="blue">
              Cadastrar
            </Button>

            <Text fontSize="0.8rem">Já tem uma conta?</Text>
            <Link to="/login">
              <Text fontSize="0.8rem">Faça login aqui</Text>
            </Link>
          </Form>
        </Section>
      </Container>
    </>
  );
}
