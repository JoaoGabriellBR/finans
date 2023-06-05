import { Container, Section } from "./styles";
import { Button, Text } from '@chakra-ui/react';
import money from "../../assets/money.png";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

export default function Home() {
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
          <Link to="/register">
            <Button colorScheme="blue">Cadastre-se agora</Button>
          </Link>
        </div>

        <div className="div-image">
          <img className="money" alt="logo" src={money} loading="lazy" />
        </div>
      </Section>
    </Container>
  );
}
