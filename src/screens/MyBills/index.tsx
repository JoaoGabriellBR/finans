import { useState, ChangeEvent } from "react";
import SideMenu from "../../components/SideMenu";
import {
  Container,
  RightBox,
  Header,
  DivCards,
  CardNovaConta,
  CardContas,
  DivSwitch,
} from "./styles";
import {
  Text,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Portal,
  Avatar,
  Button,
  Icon,
  Box,
  FormControl,
  Switch,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLeft,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FiMoreHorizontal, FiCheckCircle } from "react-icons/fi";

export default function MyBills() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  const [openNewExpense, setOpenNewExpense] = useState(false);
  const [openNewBill, setOpenNewBill] = useState(false);

  const [valueNewExpense, setValueNewExpense] = useState("");
  const [valueNewBill, setValueNewBill] = useState("");

  const formatCurrency = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  const handleChangeNewBill = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueNewBill(formatCurrency(inputValue));
  };

  const handleChangeNewExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueNewExpense(formatCurrency(inputValue));
  };

  const renderNewBill = () => {
    return (
      <Modal isOpen={openNewBill} onClose={() => setOpenNewBill(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                value={valueNewBill}
                onChange={handleChangeNewBill}
                placeholder="R$ 0,00"
                _placeholder={{ color: "#00f" }}
                fontSize="1.5rem"
                color="#00f"
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={() => setOpenNewBill(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderNewExpense = () => {
    return (
      <Modal isOpen={openNewExpense} onClose={() => setOpenNewExpense(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Despesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                value={valueNewExpense}
                onChange={handleChangeNewExpense}
                placeholder="R$ 0,00"
                _placeholder={{ color: "#f00" }}
                fontSize="1.5rem"
                color="#f00"
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
            />

            <DivSwitch>
              <div className="div-switch-icon">
                <Icon
                  cursor="pointer"
                  as={FiCheckCircle}
                  w="1rem"
                  h="1rem"
                  mr="1rem"
                />
                <Text fontSize="1rem">Não foi paga</Text>
              </div>
              <Switch colorScheme="red" />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Salvar
            </Button>
            <Button onClick={() => setOpenNewExpense(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      {renderNewBill()}
      {renderNewExpense()}
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
            <CardNovaConta onClick={() => setOpenNewBill(true)}>
              <Icon as={IoIosAddCircleOutline} h={55} w={55} />
              <Text fontSize="1.5rem">Nova conta</Text>
            </CardNovaConta>

            <CardContas>
              <Box className="div-nome-conta" mb="2rem">
                <div className="div-carteira">
                  <Icon as={FaMoneyCheckAlt} h={5} w={5} mr="1rem" />
                  <Text fontSize="1.5rem">Carteira</Text>
                </div>

                <Menu>
                  <MenuButton>
                    <Icon cursor="pointer" as={FiMoreHorizontal} h={5} w={5} />
                  </MenuButton>

                  <Portal>
                    <MenuList>
                      <MenuItem>
                        <Icon as={AiOutlineEdit} mr="1rem" />
                        Editar
                      </MenuItem>
                      <MenuItem>
                        <Icon as={AiOutlineDelete} mr="1rem" />
                        Excluir
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>

              <Box className="div-saldo-atual" mb="1rem">
                <Text fontSize="0.9rem">Saldo atual</Text>
                <Text as="b" color="green" fontSize="0.9rem">
                  R$ 500,00
                </Text>
              </Box>

              <Box className="div-saldo-previsto" mb="2rem">
                <Text fontSize="0.9rem">Saldo previsto</Text>
                <Text as="b" color="green" fontSize="0.9rem">
                  R$ 500,00
                </Text>
              </Box>

              <Button
                onClick={() => setOpenNewExpense(true)}
                alignSelf="flex-end"
                variant="ghost"
              >
                Adicionar despesa
              </Button>
            </CardContas>
          </DivCards>
        </RightBox>
      </Container>
    </>
  );
}
