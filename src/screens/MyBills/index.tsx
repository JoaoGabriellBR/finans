/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from "react";
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
  Button,
  Icon,
  Box,
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
  Alert,
  AlertIcon,
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
import { FiMoreHorizontal } from "react-icons/fi";
import handleLogout from "../../utils/handleLogout";
import Cookies from "js-cookie";
import api from "../../api";
import notification from "../../utils/toast";
import MoneyInput from "../../components/MoneyInput";

interface Revenue {
  id: number;
  balance: number;
  status: boolean;
}

interface Expense {
  id: number;
  balance: number;
  status: boolean;
}

interface BillData {
  id: number;
  description: string;
  balance: number;
  revenues?: Revenue[];
  expenses?: Expense[];
}

interface UpdateBillData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: string | undefined;
}

export default function MyBills() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const toast = useToast();

  const navigate = useNavigate();
  const previousPage = -1;

  const [billData, setBillData] = useState<BillData[]>([]);
  const [updateBillData, setUpdateBillData] = useState<UpdateBillData>();
  const [billId, setBillId] = useState();

  const [loadingNewBill, setLoadingNewBill] = useState<boolean>(false);
  const [loadingEditBill, setLoadingEditBill] = useState<boolean>(false);
  const [loadingDeleteBill, setLoadingDeleteBill] = useState<boolean>(false);

  const [openNewBill, setOpenNewBill] = useState<boolean>(false);
  const [openEditBill, setOpenEditBill] = useState<boolean>(false);
  const [openDeleteBill, setOpenDeleteBill] = useState<boolean>(false);

  const [balanceNewBill, setBalanceNewBill] = useState<string>("");

  const [descriptionNewBill, setDescriptionNewBill] = useState<string>("");

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
    } catch (e) {
      const errorMessage = "Não foi possível carregar os dados.";
      notification(toast, errorMessage, "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeBalanceNewBill = (value: any) => {
    setBalanceNewBill(value);
  };

  const handleChangeBalanceEditBill = (value: any) => {
    setUpdateBillData({ ...updateBillData, balance: value });
  };

  const handleChangeDescriptionNewBill = (e: ChangeEvent<HTMLInputElement>) => {
    setDescriptionNewBill(e.target.value);
  };

  const handleNewBill = async () => {
    setLoadingNewBill(true);
    try {
      await api({
        method: "POST",
        url: "/bill/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          balance: parseFloat(balanceNewBill),
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
      const errorMessage = error?.response?.data?.error;
      notification(toast, errorMessage, "error");
    }
  };

  const handleEditBill = async () => {
    setLoadingEditBill(true);
    try {
      await api({
        method: "PATCH",
        url: `/bill/update/${billId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          ...updateBillData,
          balance: parseFloat(updateBillData?.balance ?? ""),
          description: updateBillData?.description,
        },
      });

      setLoadingEditBill(false);
      setOpenEditBill(false);
      loadData();
      const successMessage = "Conta atualizada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingEditBill(false);
      const errorMessage =
        error?.response?.data?.error || "Ocorreu um erro ao atualizar a conta.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleDeleteBill = async () => {
    setLoadingDeleteBill(true);
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
            <MoneyInput
              value={balanceNewBill}
              onChange={handleChangeBalanceNewBill}
              price
              color="blue"
            />

            <Input
              mt="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
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
            <MoneyInput
              value={updateBillData?.balance}
              onChange={handleChangeBalanceEditBill}
              price={updateBillData?.balance}
              color="blue"
            />

            <Input
              mt="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
              value={updateBillData?.description}
              onChange={(e) => {
                setUpdateBillData((prevBillData) => ({
                  ...prevBillData,
                  description: e.target.value,
                }));
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleEditBill} colorScheme="blue" mr={3}>
              {loadingEditBill ? "Salvando" : "Salvar"}
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
            <Alert status="error">
              <AlertIcon />
              Todas as suas Despesas e Receitas serão apagadas.
            </Alert>
            <Text fontSize="1rem" mt="1.5rem">
              Tem certeza que deseja remover essa conta? Esta ação não poderá
              ser desfeita!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteBill} colorScheme="red" mr={3}>
              {loadingDeleteBill ? "Excluindo" : "Excluir"}
            </Button>
            <Button onClick={() => setOpenDeleteBill(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      {renderNewBill()}
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
                        ? bill.description.slice(0, 15) + "..."
                        : bill.description}
                    </Text>
                  </div>

                  <Menu>
                    <MenuButton onClick={() => setBillId(bill?.id)}>
                      <Icon
                        cursor="pointer"
                        as={FiMoreHorizontal}
                        h={5}
                        w={5}
                      />
                    </MenuButton>

                    <Portal>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setOpenEditBill(true);
                            setUpdateBillData(bill);
                          }}
                        >
                          <Icon as={AiOutlineEdit} mr="1rem" />
                          Editar
                        </MenuItem>
                        <MenuItem onClick={() => setOpenDeleteBill(true)}>
                          <Icon as={AiOutlineDelete} mr="1rem" />
                          Excluir
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>

                <Box className="div-saldo-atual" mb="1rem">
                  <Text fontSize="0.9rem">Saldo total</Text>
                  <Text as="b" color="green" fontSize="0.9rem">
                    R$ {bill?.balance.toFixed(2)}
                  </Text>
                </Box>

                <Box className="div-saldo-atual" mb="1rem">
                  <Text fontSize="0.9rem">Saldo atual</Text>
                  <Text
                    as="b"
                    color={bill?.billTotal < 0 ? "red" : "green"}
                    fontSize="0.9rem"
                  >
                    R$ {bill?.billTotal.toFixed(2)}
                  </Text>
                </Box>

                <Box className="div-saldo-previsto" mb="1rem">
                  <Text fontSize="0.9rem">Total de despesas</Text>
                  <Text as="b" color="green" fontSize="0.9rem">
                    {bill?.expenses?.length}{" "}
                    {bill?.expenses?.length > 1
                      ? "despesas"
                      : !bill?.expenses?.length
                      ? "despesas"
                      : "despesa"}
                  </Text>
                </Box>

                <Box className="div-saldo-previsto" mb="2rem">
                  <Text fontSize="0.9rem">Total de receitas</Text>
                  <Text as="b" color="green" fontSize="0.9rem">
                    {bill?.revenues?.length}{" "}
                    {bill?.revenues?.length > 1
                      ? "receitas"
                      : !bill?.revenues?.length
                      ? "receitas"
                      : "receita"}
                  </Text>
                </Box>
              </CardContas>
            ))}
          </DivCards>
        </RightBox>
      </Container>
    </>
  );
}
