import { LeftBox } from "./styles";
import {
  Text,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Portal,
  Avatar,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiFillBank } from "react-icons/ai";
import { RxExit, RxDashboard } from "react-icons/rx";
import logo from "../../assets/logo.png";

export default function SideMenu() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  return (
    <LeftBox>
      <img className="logo" alt="logo" src={logo} loading="lazy" />

      {!isMobile && (
        <>
          <div
            onClick={() => navigate("/profile")}
            className="div-minhas-contas"
            style={{ marginTop: "2rem" }}
          >
            <AiOutlineUser />
            <Text fontSize="1rem" ml="1rem">
              Meu Perfil
            </Text>
          </div>

          <div
            onClick={() => navigate("/dashboard")}
            className="div-minhas-contas"
          >
            <RxDashboard />
            <Text fontSize="1rem" ml="1rem">
              Dashboard
            </Text>
          </div>

          <div
            onClick={() => navigate("/my-bills")}
            className="div-minhas-contas"
          >
            <AiFillBank />
            <Text fontSize="1rem" ml="1rem">
              Minhas contas
            </Text>
          </div>
        </>
      )}

      {isMobile && (
        <Menu>
          <MenuButton>
            <Avatar w={10} h={10} bg="#3182CE" />
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={() => navigate("/profile")}>
                <Icon as={AiOutlineUser} w="1rem" h="1rem" color="#3182CE" />
                <Text ml="0.5rem" fontSize="1rem">
                  Meu Perfil
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
      )}
    </LeftBox>
  );
}
