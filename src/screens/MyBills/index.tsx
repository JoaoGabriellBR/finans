import SideMenu from "../../components/SideMenu";
import {
  Container,
  RightBox,
  Header,
  DivCards,
  CardNovaConta,
  CardContas,
} from "./styles";
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
import { AiOutlineUser, AiOutlineLeft } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function MyBills() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  return (
    <Container>
      <SideMenu />
      <RightBox>
        <Header>
          <div className="div-minhas-contas">
            <Icon
              onClick={() => navigate(-1)}
              cursor="pointer"
              as={AiOutlineLeft}
              mt="0.25rem"
              mr="1rem"
            />
            <Text fontSize="1.5rem">Minhas contas</Text>
          </div>
          {!isMobile && (
            <Menu>
              <MenuButton>
                <Avatar w={10} h={10} bg="#3182CE" />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Icon
                      as={AiOutlineUser}
                      w="1rem"
                      h="1rem"
                      color="#3182CE"
                    />
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
        </Header>

        <DivCards>
          <CardNovaConta>
            <Icon as={IoIosAddCircleOutline} h={55} w={55} />
            <Text fontSize="1.5rem">Nova conta</Text>
          </CardNovaConta>
          <CardContas>
            <div className="div-nome-conta">
              <Icon as={FaMoneyCheckAlt} />
              <Text fontSize="1rem">Carteira</Text>
            </div>
            <div className="div-saldo-atual">d</div>
            <div className="div-saldo-previsto">d</div>
            <div className="div-adicionar-despesa">d</div>
          </CardContas>
        </DivCards>
      </RightBox>
    </Container>
  );
}
