import { Container, Section } from "./styles";
import { Button, Text } from "@chakra-ui/react";
import money from "../../assets/money.png";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />

      <Section>
        <div className="div-text">
          <Text mb={3} fontSize="3.5rem">
            Suas contas, descomplicadas
          </Text>
          <Text mb={3} fontSize="1rem">
            Finans é a ferramenta online ideal para simplificar e aprimorar a
            sua vida financeira, proporcionando praticidade, eficiência e
            controle total sobre suas finanças pessoais.
          </Text>
          <Button onClick={() => navigate("/register")} colorScheme="blue">
            Cadastre-se agora
          </Button>
        </div>

        <div className="div-image">
          <img className="money" alt="logo" src={money} loading="lazy" />
        </div>
      </Section>
    </Container>
  );
}
