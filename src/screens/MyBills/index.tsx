import { useState, useEffect, ChangeEvent } from "react";
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
  useToast,
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
import handleLogout from "../../utils/handleLogout";
import Cookies from "js-cookie";
import api from "../../api";
import notification from "../../utils/toast";
import { formatCurrency, getNumericValue } from "../../utils/formatCurrency";

interface BillData {
  id: number;
  description: string;
  balance: number;
}

export default function MyBills() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const toast = useToast();

  const navigate = useNavigate();
  const previousPage = -1;

  const [billData, setBillData] = useState<BillData[]>([]);
  const [billId, setBillId] = useState();

  const [loadingNewBill, setLoadingNewBill] = useState(false);
  const [loadingDeleteBill, setLoadingDeleteBill] = useState(false);

  const [openNewExpense, setOpenNewExpense] = useState(false);
  const [openNewBill, setOpenNewBill] = useState(false);
  const [openEditBill, setOpenEditBill] = useState(false);
  const [openDeleteBill, setOpenDeleteBill] = useState(false);

  const [balanceNewExpense, setBalanceNewExpense] = useState("");

  const [balanceNewBill, setBalanceNewBill] = useState("");
  const [balanceEditBill, setBalanceEditBill] = useState("");

  const [descriptionNewBill, setDescriptionNewBill] = useState("");
  const [descriptionEditBill, setDescriptionEditBill] = useState("");

  const loadData = async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/bill/get",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setBillData(response?.data?.response);
      console.log(billData);
    } catch (e) {
      const errorMessage = "Não foi possível carregar os dados.";
      notification(toast, errorMessage, "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeBalanceNewBill = (e: ChangeEvent<HTMLInputElement>) => {
    setBalanceNewBill(formatCurrency(e.target.value));
  };

  const handleChangeDescriptionNewBill = (e: ChangeEvent<HTMLInputElement>) => {
    setDescriptionNewBill(e.target.value);
  };

  const handleChangeBalanceEditBill = (e: ChangeEvent<HTMLInputElement>) => {
    setBalanceNewBill(formatCurrency(e.target.value));
  };

  const handleChangeNewExpense = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setBalanceNewExpense(formatCurrency(inputValue));
  };

  const handleNewBill = async () => {
    setLoadingNewBill(true);
    try {
      const numericValue = getNumericValue(balanceNewBill);
      await api({
        method: "POST",
        url: "/bill/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          balance: numericValue,
          description: descriptionNewBill,
        },
      });

      setLoadingNewBill(false);
      setOpenNewBill(false);
      loadData();
      const successMessage = "Conta criada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingNewBill(false);
      setOpenNewBill(false);
      const errorMessage = error?.response?.data?.error;
      notification(toast, errorMessage, "error");
    }
  };

  const handleDeleteBill = async () => {
    try {
      await api({
        method: "PATCH",
        url: `/bill/delete/${billId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });

      setLoadingDeleteBill(false);
      setOpenDeleteBill(false);
      loadData();

      const successMessage = "Conta excluída com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingDeleteBill(false);
      setOpenDeleteBill(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível excluir a conta.";
      notification(toast, errorMessage, "error");
    }
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
                placeholder="R$ 0,00"
                _placeholder={{ color: "#00f" }}
                fontSize="1.5rem"
                color="#00f"
                value={balanceNewBill}
                onChange={handleChangeBalanceNewBill}
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={500}
              value={descriptionNewBill}
              onChange={handleChangeDescriptionNewBill}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleNewBill} colorScheme="blue" mr={3}>
              {loadingNewBill ? "Salvando..." : "Salvar"}
            </Button>
            <Button onClick={() => setOpenNewBill(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderEditBill = () => {
    return (
      <Modal isOpen={openEditBill} onClose={() => setOpenEditBill(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Conta </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "#00f" }}
                fontSize="1.5rem"
                color="#00f"
                value={billData[0]?.balance}
                onChange={handleChangeBalanceEditBill}
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={500}
              value={billData[0]?.description}
              onChange={(e) => {
                const updatedBillData = [...billData];
                updatedBillData[0].description = e.target.value;
                setBillData(updatedBillData);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={() => setOpenEditBill(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderDeleteBill = () => {
    return (
      <Modal isOpen={openDeleteBill} onClose={() => setOpenDeleteBill(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Conta</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text fontSize="1rem">
              Tem certeza que deseja remover essa conta? Esta ação não poderá
              ser desfeita!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteBill} colorScheme="red" mr={3}>
              Excluir
            </Button>
            <Button onClick={() => setOpenDeleteBill(false)}>Cancelar</Button>
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
                value={balanceNewExpense}
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
              placeholder="Descrição (max 50 caracteres)"
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
      {renderEditBill()}
      {renderDeleteBill()}
      <Container>
        <SideMenu />
        <RightBox>
          <Header>
            <div className="div-minhas-contas">
              <Icon
                onClick={() => navigate(previousPage)}
                cursor="pointer"
                as={AiOutlineLeft}
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

                    <MenuItem onClick={() => handleLogout(navigate)}>
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

            {billData?.map((bill: any) => (
              <CardContas>
                <Box className="div-nome-conta" mb="2rem">
                  <div className="div-carteira">
                    <Icon as={FaMoneyCheckAlt} h={5} w={5} mr="1rem" />
                    <Text fontSize="1.5rem">
                      {bill.description.length >= 20
                        ? bill.description.slice(0, 15) + '...'
                        : bill.description}
                    </Text>
                  </div>

                  <Menu>
                    <MenuButton>
                      <Icon
                        cursor="pointer"
                        as={FiMoreHorizontal}
                        h={5}
                        w={5}
                      />
                    </MenuButton>

                    <Portal>
                      <MenuList>
                        <MenuItem onClick={() => setOpenEditBill(true)}>
                          <Icon as={AiOutlineEdit} mr="1rem" />
                          Editar
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setOpenDeleteBill(true);
                            setBillId(bill?.id);
                          }}
                        >
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
                    R$ {bill?.balance}
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
            ))}
          </DivCards>
        </RightBox>
      </Container>
    </>
  );
}
