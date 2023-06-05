import { Cabecalho } from "./styles";
import { Button, ButtonGroup } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Cabecalho>
      <Link to="/">
        <img className="logo" alt="logo" src={logo} loading="lazy" />
      </Link>

      <ButtonGroup spacing="5">
        <Link to="/login">
          <Button colorScheme="blue" variant="outline">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="blue">Cadastre-se</Button>
        </Link>
      </ButtonGroup>
    </Cabecalho>
  );
}
