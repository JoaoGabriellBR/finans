import { Cabecalho } from "./styles";
import { Button, ButtonGroup } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Cabecalho>
      <img
        onClick={() => navigate("/")}
        className="logo"
        alt="logo"
        src={logo}
        loading="lazy"
      />

      <ButtonGroup spacing="5">
        <Button
          onClick={() => navigate("/login")}
          colorScheme="blue"
          variant="outline"
        >
          Login
        </Button>
        <Button onClick={() => navigate("/register")} colorScheme="blue">
          Cadastre-se
        </Button>
      </ButtonGroup>
    </Cabecalho>
  );
}
