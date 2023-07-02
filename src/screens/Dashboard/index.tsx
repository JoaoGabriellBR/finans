import { useState, useEffect, ChangeEvent } from "react";
import {
  Container,
  RightBox,
  Header,
  DivCards,
  Card,
  CardLeft,
  CardRight,
  DivTitleDespesas,
  DivDespesas,
  DivTitleReceitas,
  DivReceitas,
  DivAcoes,
  DivSwitch,
  DivDelete,
  DivPayExpense,
} from "./styles";
import {
  Tooltip,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Portal,
  Avatar,
  Text,
  Icon,
  Button,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Input,
  Switch,
  Select,
  IconButton,
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
import { SiStarlingbank } from "react-icons/si";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { FiCheckCircle, FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import handleLogout from "../../utils/handleLogout";
import notification from "../../utils/toast";
import api from "../../api";
import Cookies from "js-cookie";
import moment from "moment";
import { formatCurrency } from "../../utils/formatCurrency";
import MoneyInput from "../../components/MoneyInput";

interface BillData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: number | undefined;
}

interface ExpenseData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: number | undefined;
  status?: boolean | undefined;
  created_at?: number | undefined;
}

interface RevenueData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: number | undefined;
  status?: boolean | undefined;
  created_at?: number | undefined;
}

interface UpdateExpenseData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: string | undefined;
  status?: boolean | undefined;
  created_at?: number | undefined;
}

interface UpdateRevenueData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: string | undefined;
  status?: boolean | undefined;
  created_at?: number | undefined;
}

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingNewExpense, setLoadingNewExpense] = useState(false);
  const [loadingNewRevenue, setLoadingNewRevenue] = useState(false);

  const [loadingPayExpense, setLoadingPayExpense] = useState(false);
  const [loadingReceiveRevenue, setLoadingReceiveRevenue] = useState(false);

  const [loadingEditExpense, setLoadingEditExpense] = useState(false);
  const [loadingEditRevenue, setLoadingEditRevenue] = useState(false);

  const [loadingDeleteExpense, setLoadingDeleteExpense] = useState(false);
  const [loadingDeleteRevenue, setLoadingDeleteRevenue] = useState(false);

  const [billData, setBillData] = useState<BillData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);

  const [updateExpenseData, setUpdateExpenseData] =
    useState<UpdateExpenseData>();
  const [updateRevenueData, setUpdateRevenueData] =
    useState<UpdateRevenueData>();

  const [selectedBillExpense, setSelectedBillExpense] = useState<string>("");
  const [selectedBillRevenue, setSelectedBillRevenue] = useState<string>("");

  const [openNewExpense, setOpenNewExpense] = useState(false);
  const [openPayExpense, setOpenPayExpense] = useState(false);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [openDeleteExpense, setOpenDeleteExpense] = useState(false);

  const [openNewRevenue, setOpenNewRevenue] = useState(false);
  const [openReceiveRevenue, setOpenReceiveRevenue] = useState(false);
  const [openEditRevenue, setOpenEditRevenue] = useState(false);
  const [openDeleteRevenue, setOpenDeleteRevenue] = useState(false);

  const [balanceNewExpense, setBalanceNewExpense] = useState("");
  const [balanceNewRevenue, setBalanceNewRevenue] = useState("");

  const [descriptionNewExpense, setDescriptionNewExpense] = useState("");
  const [descriptionNewRevenue, setDescriptionNewRevenue] = useState("");

  const [statusNewExpense, setStatusNewExpense] = useState(Boolean);
  const [statusNewRevenue, setStatusNewRevenue] = useState(Boolean);

  const [totalBalanceBill, setTotalBalanceBill] = useState<number>(0);
  const [totalBalanceExpense, setTotalBalanceExpense] = useState<number>(0);
  const [totalBalanceRevenue, setTotalBalanceRevenue] = useState<number>(0);


  // MOSTRAR EM SALDO ATUAL O TOTAL DE DINHEIRO QUE A PESSOA POSSUI MENOS AS
  // DESPESAS E MAIS AS RECEITAS

  const loadExpenseData = async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/expense/get",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });

      setExpenseData(response?.data?.response);
    } catch (e) {
      const errorMessage = "Não foi possível carregar os dados.";
      notification(toast, errorMessage, "error");
    }
  };

  useEffect(() => {
    loadExpenseData();
  }, []);

  const loadRevenueData = async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/revenue/get",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setRevenueData(response?.data?.response);
    } catch (e) {
      const errorMessage = "Não foi possível carregar os dados.";
      notification(toast, errorMessage, "error");
    }
  };

  useEffect(() => {
    loadRevenueData();
  }, []);

  const loadBillData = async () => {
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
    loadBillData();
  }, []);

  const calculateTotalBalanceBill = () => {
    const sum = billData.reduce((accumulator, bill) => {
      if (bill.balance !== undefined) {
        return accumulator + bill.balance;
      } else {
        return accumulator;
      }
    }, 0);

    setTotalBalanceBill(sum);
  };

  const calculateTotalBalanceExpense = () => {
    const sum = expenseData.reduce((accumulator, expense) => {
      if (expense.balance !== undefined) {
        if (expense.status === true) {
          setTotalBalanceBill(
            (prevTotal) => prevTotal - Number(expense?.balance)
          );
        }
        return accumulator + expense.balance;
      } else {
        return accumulator;
      }
    }, 0);
    setTotalBalanceExpense(sum);
  };

  const calculateTotalBalanceRevenue = () => {
    const sum = revenueData.reduce((accumulator, revenue) => {
      if (revenue.balance !== undefined) {
        if (revenue.status === true) {
          setTotalBalanceBill(
            (prevTotal) => prevTotal + Number(revenue.balance)
          );
        }
        return accumulator + revenue.balance;
      } else {
        return accumulator;
      }
    }, 0);
    setTotalBalanceRevenue(sum);
  };

  useEffect(() => {
    calculateTotalBalanceBill();
  }, [billData]);

  useEffect(() => {
    calculateTotalBalanceExpense();
  }, [expenseData]);

  useEffect(() => {
    calculateTotalBalanceRevenue();
  }, [revenueData]);

  const handleChangeBalanceNewExpense = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    const floatValue = parseFloat(rawValue) / 100;
    const stringValue = floatValue.toString();
    setBalanceNewExpense(stringValue);
  };

  const handleChangeBalanceNewRevenue = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    const floatValue = parseFloat(rawValue) / 100;
    const stringValue = floatValue.toString();
    setBalanceNewRevenue(stringValue);
  };

  const handleChangeBalanceEditExpense = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    const floatValue = parseFloat(rawValue) / 100;
    const stringValue = floatValue.toString();
    setUpdateExpenseData({ ...updateExpenseData, balance: stringValue });
  };

  const handleChangeBalanceEditRevenue = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    const floatValue = parseFloat(rawValue) / 100;
    const stringValue = floatValue.toString();
    setUpdateRevenueData({ ...updateRevenueData, balance: stringValue });
  };

  const handleChangeDescriptionNewExpense = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionNewExpense(e.target.value);
  };

  const handleChangeDescriptionNewRevenue = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionNewRevenue(e.target.value);
  };

  const handleNewExpense = async () => {
    setLoadingNewExpense(true);
    try {
      await api({
        method: "POST",
        url: "/expense/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          id_bill: selectedBillExpense,
          balance: parseFloat(balanceNewExpense),
          description: descriptionNewExpense,
          status: statusNewExpense,
        },
      });

      setSelectedBillExpense("");
      setBalanceNewExpense("");
      setDescriptionNewExpense("");
      setStatusNewExpense(false);

      setLoadingNewExpense(false);
      setOpenNewExpense(false);
      loadExpenseData();
      const successMessage = "Despesa criada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingNewExpense(false);
      const errorMessage = error?.response?.data?.error;
      notification(toast, errorMessage, "error");
    }
  };

  const handlePayExpense = async () => {
    setLoadingPayExpense(true);
    try {
      await api({
        method: "PATCH",
        url: `/pay-expense/${updateExpenseData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setLoadingPayExpense(false);
      setOpenPayExpense(false);
      loadExpenseData();
      const successMessage = "Despesa paga com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingPayExpense(false);
      setOpenPayExpense(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível pagar a despesa.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleEditExpense = async () => {
    setLoadingEditExpense(true);
    try {
      const formattedExpense = (
        Number(updateExpenseData?.balance) * 100
      ).toString();
      await api({
        method: "PATCH",
        url: `/expense/update/${updateExpenseData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          ...updateExpenseData,
          balance: parseFloat(formattedExpense),
          description: updateExpenseData?.description,
          status: updateExpenseData?.status,
        },
      });

      setLoadingEditExpense(false);
      setOpenEditExpense(false);
      loadExpenseData();
      calculateTotalBalanceBill();

      const successMessage = "Despesa atualizada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingEditExpense(false);
      setOpenEditExpense(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível atualizar a despesa.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleDeleteExpense = async () => {
    setLoadingDeleteExpense(true);
    try {
      await api({
        method: "PATCH",
        url: `/expense/delete/${updateExpenseData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setLoadingDeleteExpense(false);
      setOpenDeleteExpense(false);
      loadExpenseData();
      calculateTotalBalanceBill();
      const successMessage = "Despesa excluída com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingDeleteExpense(false);
      setOpenDeleteExpense(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível excluir a despesa.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleNewRevenue = async () => {
    setLoadingNewRevenue(true);
    try {
      await api({
        method: "POST",
        url: "/revenue/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          id_bill: selectedBillRevenue,
          balance: parseFloat(balanceNewRevenue),
          description: descriptionNewRevenue,
          status: statusNewRevenue,
        },
      });

      setSelectedBillRevenue("");
      setBalanceNewRevenue("");
      setDescriptionNewRevenue("");
      setStatusNewRevenue(false);

      setLoadingNewRevenue(false);
      setOpenNewRevenue(false);
      loadRevenueData();
      const successMessage = "Receita criada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingNewRevenue(false);
      const errorMessage = error?.response?.data?.error;
      notification(toast, errorMessage, "error");
    }
  };

  const handleReceiveRevenue = async () => {
    setLoadingReceiveRevenue(true);
    try {
      await api({
        method: "PATCH",
        url: `/receive-revenue/${updateRevenueData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setLoadingReceiveRevenue(false);
      setOpenReceiveRevenue(false);
      loadRevenueData();
      calculateTotalBalanceBill();
      const successMessage = "Receita recebida com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingReceiveRevenue(false);
      setOpenReceiveRevenue(false);
      const errorMessage =
        error?.response?.data?.error ||
        "Não foi possível processar o recebimento da receita.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleEditRevenue = async () => {
    setLoadingEditRevenue(true);
    try {
      const formattedRevenue = (
        Number(updateRevenueData?.balance) * 100
      ).toString();
      await api({
        method: "PATCH",
        url: `/revenue/update/${updateRevenueData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          balance: parseFloat(formattedRevenue),
          description: updateRevenueData?.description,
          status: updateRevenueData?.status,
        },
      });
      setLoadingEditRevenue(false);
      setOpenEditRevenue(false);
      loadRevenueData();
      calculateTotalBalanceBill();
      const successMessage = "Receita atualizada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingEditRevenue(false);
      setOpenEditRevenue(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível atualizar a receita.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleDeleteRevenue = async () => {
    setLoadingDeleteRevenue(true);
    try {
      await api({
        method: "PATCH",
        url: `/revenue/delete/${updateRevenueData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
      });
      setLoadingDeleteRevenue(false);
      setOpenDeleteRevenue(false);
      loadRevenueData();
      calculateTotalBalanceBill();
      const successMessage = "Receita excluída com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingDeleteRevenue(false);
      setOpenDeleteRevenue(false);
      const errorMessage =
        error?.response?.data?.error || "Não foi possível excluir a receita.";
      notification(toast, errorMessage, "error");
    }
  };

  const renderNewExpense = () => {
    return (
      <Modal isOpen={openNewExpense} onClose={() => setOpenNewExpense(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Despesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MoneyInput
              value={balanceNewExpense}
              onChange={handleChangeBalanceNewExpense}
              color="red"
            />

            <Input
              mt="1.5rem"
              mb="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
              value={descriptionNewExpense}
              onChange={handleChangeDescriptionNewExpense}
            />

            <Select
              mb="1.5rem"
              variant="flushed"
              placeholder="Selecione uma conta"
              value={selectedBillExpense}
              onChange={(e) => setSelectedBillExpense(e.target.value)}
            >
              {billData?.length >= 1 &&
                billData.map((bill: BillData) => (
                  <option key={bill.id} value={bill.id}>
                    {bill.description}
                  </option>
                ))}

              {!billData?.length && (
                <option disabled>Nenhuma conta encontrada</option>
              )}
            </Select>

            <DivSwitch>
              <div className="div-switch-icon">
                <Icon
                  cursor="pointer"
                  as={FiCheckCircle}
                  w="1rem"
                  h="1rem"
                  mr="1rem"
                />
                <Text fontSize="1rem">
                  {statusNewExpense ? "Paga" : "Não foi paga"}
                </Text>
              </div>
              <Switch
                isChecked={statusNewExpense}
                onChange={() => setStatusNewExpense(!statusNewExpense)}
                colorScheme="red"
              />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleNewExpense} colorScheme="red" mr={3}>
              {loadingNewExpense ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              onClick={() => {
                setOpenNewExpense(false);
                setBalanceNewExpense("");
                setDescriptionNewExpense("");
                setSelectedBillExpense("");
                setStatusNewExpense(false);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderPayExpense = () => {
    return (
      <Modal isOpen={openPayExpense} onClose={() => setOpenPayExpense(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja efetivar esta despesa?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb="1rem" fontSize="1rem">
              Ao efetivar essa despesa será descontado o valor na conta.
            </Text>

            <DivPayExpense>
              <Box mb="1rem">
                <Text fontSize="1rem">Descrição</Text>
                <Text color="gray" fontSize="1rem">
                  {updateExpenseData?.description}
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ {updateExpenseData?.balance}
                </Text>
              </Box>
            </DivPayExpense>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handlePayExpense} colorScheme="red" mr={3}>
              {loadingPayExpense ? "Pagando..." : "Pagar"}
            </Button>
            <Button onClick={() => setOpenPayExpense(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderEditExpense = () => {
    return (
      <Modal isOpen={openEditExpense} onClose={() => setOpenEditExpense(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Despesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MoneyInput
              value={(Number(updateExpenseData?.balance) * 100).toString()}
              onChange={(value) => {
                const formattedValue = Number(value) / 100;
                handleChangeBalanceEditExpense(formattedValue.toString());
              }}
              color="red"
            />

            <Input
              mt="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
              value={updateExpenseData?.description}
              onChange={(e) =>
                setUpdateExpenseData({
                  ...updateExpenseData,
                  description: e.target.value,
                })
              }
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
                <Text fontSize="1rem">
                  {updateExpenseData?.status ? "Paga" : "Não foi paga"}
                </Text>
              </div>
              <Switch
                isChecked={updateExpenseData?.status}
                onChange={() =>
                  setUpdateExpenseData({
                    ...updateExpenseData,
                    status: !updateExpenseData?.status,
                  })
                }
                colorScheme="red"
              />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleEditExpense} colorScheme="red" mr={3}>
              {loadingEditExpense ? "Salvando..." : "Salvar"}
            </Button>
            <Button onClick={() => setOpenEditExpense(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderDeleteExpense = () => {
    return (
      <Modal
        isOpen={openDeleteExpense}
        onClose={() => setOpenDeleteExpense(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Despesa</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text fontSize="1rem">
              Tem certeza que deseja remover essa despesa? Esta ação não poderá
              ser desfeita!
            </Text>

            <DivDelete>
              <Box mb="1rem">
                <Text fontSize="1rem">Descrição</Text>
                <Text color="gray" fontSize="1rem">
                  {updateExpenseData?.description}
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ {updateExpenseData?.balance}
                </Text>
              </Box>
            </DivDelete>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteExpense} colorScheme="red" mr={3}>
              {loadingDeleteExpense ? "Excluindo..." : "Excluir"}
            </Button>
            <Button onClick={() => setOpenDeleteExpense(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderNewRevenue = () => {
    return (
      <Modal isOpen={openNewRevenue} onClose={() => setOpenNewRevenue(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Receita</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MoneyInput
              value={balanceNewRevenue}
              onChange={handleChangeBalanceNewRevenue}
              color="green"
            />

            <Input
              mt="1.5rem"
              mb="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
              value={descriptionNewRevenue}
              onChange={handleChangeDescriptionNewRevenue}
            />

            <Select
              mb="1.5rem"
              variant="flushed"
              placeholder="Selecione uma conta"
              value={selectedBillRevenue}
              onChange={(e) => setSelectedBillRevenue(e.target.value)}
            >
              {billData?.length >= 1 &&
                billData.map((bill: BillData) => (
                  <option key={bill.id} value={bill.id}>
                    {bill.description}
                  </option>
                ))}

              {!billData?.length && (
                <option disabled>Nenhuma conta encontrada</option>
              )}
            </Select>

            <DivSwitch>
              <div className="div-switch-icon">
                <Icon
                  cursor="pointer"
                  as={FiCheckCircle}
                  w="1rem"
                  h="1rem"
                  mr="1rem"
                />
                <Text fontSize="1rem">
                  {statusNewRevenue ? "Recebida" : "Não foi recebida"}
                </Text>
              </div>
              <Switch
                isChecked={statusNewRevenue}
                onChange={() => setStatusNewRevenue(!statusNewRevenue)}
                colorScheme="green"
              />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleNewRevenue} colorScheme="green" mr={3}>
              {loadingNewRevenue ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              onClick={() => {
                setOpenNewRevenue(false);
                setBalanceNewRevenue("");
                setDescriptionNewRevenue("");
                setSelectedBillRevenue("");
                setStatusNewRevenue(false);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderReceiveRevenue = () => {
    return (
      <Modal
        isOpen={openReceiveRevenue}
        onClose={() => setOpenReceiveRevenue(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja efetivar esta receita?</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text mb="1rem" fontSize="1rem">
              Ao efetivar essa receita, será adicionado o valor na conta.
            </Text>

            <DivPayExpense>
              <Box mb="1rem">
                <Text fontSize="1rem">Descrição</Text>
                <Text color="gray" fontSize="1rem">
                  {updateRevenueData?.description}
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ {updateRevenueData?.balance}
                </Text>
              </Box>
            </DivPayExpense>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleReceiveRevenue} colorScheme="green" mr={3}>
              {loadingReceiveRevenue ? "Recebendo..." : "Receber"}
            </Button>
            <Button onClick={() => setOpenReceiveRevenue(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderEditRevenue = () => {
    return (
      <Modal isOpen={openEditRevenue} onClose={() => setOpenEditRevenue(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Receita</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MoneyInput
              value={(Number(updateRevenueData?.balance) * 100).toString()}
              onChange={(value) => {
                const formattedValue = Number(value) / 100;
                handleChangeBalanceEditRevenue(formattedValue.toString());
              }}
              color="green"
            />

            <Input
              mt="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição (max 50 caracteres)"
              maxLength={50}
              value={updateRevenueData?.description}
              onChange={(e) =>
                setUpdateRevenueData({
                  ...updateRevenueData,
                  description: e.target.value,
                })
              }
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
                <Text fontSize="1rem">
                  {updateRevenueData?.status ? "Recebida" : "Não foi recebida"}
                </Text>
              </div>
              <Switch
                isChecked={updateRevenueData?.status}
                onChange={() =>
                  setUpdateRevenueData({
                    ...updateRevenueData,
                    status: !updateRevenueData?.status,
                  })
                }
                colorScheme="green"
              />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleEditRevenue} colorScheme="green" mr={3}>
              {loadingEditRevenue ? "Salvando..." : "Salvar"}
            </Button>
            <Button onClick={() => setOpenEditRevenue(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const renderDeleteRevenue = () => {
    return (
      <Modal
        isOpen={openDeleteRevenue}
        onClose={() => setOpenDeleteRevenue(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Receita</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text fontSize="1rem">
              Tem certeza que deseja remover essa receita? Esta ação não poderá
              ser desfeita!
            </Text>

            <DivDelete>
              <Box mb="1rem">
                <Text fontSize="1rem">Descrição</Text>
                <Text color="gray" fontSize="1rem">
                  {updateRevenueData?.description}
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ {updateRevenueData?.balance}
                </Text>
              </Box>
            </DivDelete>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteRevenue} colorScheme="green" mr={3}>
              {loadingDeleteRevenue ? "Excluindo..." : "Excluir"}
            </Button>
            <Button onClick={() => setOpenDeleteRevenue(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      {renderNewExpense()}
      {renderPayExpense()}
      {renderEditExpense()}
      {renderDeleteExpense()}

      {renderNewRevenue()}
      {renderReceiveRevenue()}
      {renderEditRevenue()}
      {renderDeleteRevenue()}
      <Container>
        <SideMenu />

        <RightBox>
          <Header>
            <Text fontSize="1.5rem">Dashboard</Text>
            {!isMobile ? (
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
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <IoMdAdd
                      style={{ color: "white", height: 20, width: 25 }}
                    />
                  }
                  colorScheme="blue"
                >
                  Nova
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setOpenNewExpense(true)}>
                    <Icon
                      as={BsFillArrowDownCircleFill}
                      w="1rem"
                      h="1rem"
                      color="#f44336"
                    />
                    <Text ml="0.5rem" fontSize="1rem">
                      Despesa
                    </Text>
                  </MenuItem>

                  <MenuItem onClick={() => setOpenNewRevenue(true)}>
                    <Icon
                      as={BsFillArrowUpCircleFill}
                      w="1rem"
                      h="1rem"
                      color="#4caf50"
                    />
                    <Text ml="0.5rem" fontSize="1rem">
                      Receita
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Header>

          <DivCards>
            <Tooltip
              label="O valor total que você tem em suas contas ativas."
              aria-label="A tooltip"
            >
              <Card>
                <CardLeft>
                  <Text fontSize="0.9rem" color="gray">
                    Saldo atual
                  </Text>
                  <Text fontSize="1.5rem">
                    {formatCurrency(totalBalanceBill.toString())}
                  </Text>
                </CardLeft>

                <CardRight>
                  <Icon
                    as={SiStarlingbank}
                    w="2.5rem"
                    h="2.5rem"
                    color="#3182CE"
                  />
                </CardRight>
              </Card>
            </Tooltip>

            <Tooltip
              label="O valor total de suas receitas cadastradas, recebidas ou pendentes."
              aria-label="A tooltip"
            >
              <Card>
                <CardLeft>
                  <Text fontSize="0.9rem" color="gray">
                    Receitas
                  </Text>
                  <Text fontSize="1.5rem">
                    {" "}
                    {formatCurrency(totalBalanceRevenue.toString())}
                  </Text>
                </CardLeft>

                <CardRight>
                  <Icon
                    as={BsFillArrowUpCircleFill}
                    w="2.5rem"
                    h="2.5rem"
                    color="#4caf50"
                  />
                </CardRight>
              </Card>
            </Tooltip>

            <Tooltip
              label="O valor total de suas despesas cadastradas, pagas ou pendentes."
              aria-label="A tooltip"
            >
              <Card>
                <CardLeft>
                  <Text fontSize="0.9rem" color="gray">
                    Despesas
                  </Text>
                  <Text fontSize="1.5rem">
                    {formatCurrency(totalBalanceExpense.toString())}
                  </Text>
                </CardLeft>

                <CardRight>
                  <Icon
                    as={BsFillArrowDownCircleFill}
                    w="2.5rem"
                    h="2.5rem"
                    color="#f44336"
                  />
                </CardRight>
              </Card>
            </Tooltip>
          </DivCards>

          <DivTitleDespesas>
            <Text fontSize="1.5rem">Despesas</Text>

            {!isMobile && (
              <Button
                onClick={() => setOpenNewExpense(true)}
                leftIcon={
                  <IoMdAdd style={{ color: "white", height: 20, width: 25 }} />
                }
                colorScheme="red"
              >
                Nova despesa
              </Button>
            )}
          </DivTitleDespesas>

          <DivDespesas>
            <TableContainer width="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th width="20%">Situação</Th>
                    <Th width="20%" isNumeric>
                      Data de criação
                    </Th>
                    <Th width="30%">Descrição</Th>
                    <Th width="5%" isNumeric>
                      Valor
                    </Th>
                    <Th width="15%">Ações</Th>
                  </Tr>
                </Thead>

                {expenseData.length !== 0 ? (
                  expenseData.map((expense: ExpenseData) => {
                    return (
                      <Tbody key={expense.id}>
                        <Tr>
                          <Td>
                            {expense.status === false ? (
                              <Text color="red">Pendente</Text>
                            ) : (
                              <Text color="green">Paga</Text>
                            )}
                          </Td>
                          <Td isNumeric>
                            {moment(expense.created_at).format("DD/MM/YYYY")}
                          </Td>
                          {Number(expense?.description?.length) >= 20 ? (
                            <Td>{expense.description?.slice(0, 20)}...</Td>
                          ) : (
                            <Td>{expense.description}</Td>
                          )}
                          <Td color="#f00">
                            {formatCurrency(String(expense?.balance))}
                          </Td>
                          <Td>
                            <DivAcoes>
                              <Tooltip
                                label="Pagar despesa"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenPayExpense(true);
                                    setUpdateExpenseData(expense);
                                  }}
                                  isDisabled={expense.status !== false}
                                >
                                  <FiCheckCircle
                                    cursor="pointer"
                                    aria-label="Pay expense"
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                label="Editar despesa"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenEditExpense(true);
                                    setUpdateExpenseData(expense);
                                  }}
                                >
                                  <FiEdit
                                    cursor="pointer"
                                    aria-label="Edit expense"
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                label="Excluir despesa"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenDeleteExpense(true);
                                    setUpdateExpenseData(expense);
                                  }}
                                >
                                  <AiOutlineDelete
                                    cursor="pointer"
                                    aria-label="Delete expense"
                                  />
                                </IconButton>
                              </Tooltip>
                            </DivAcoes>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })
                ) : (
                  <Text p="6">Você não possui despesas cadastradas.</Text>
                )}
              </Table>
            </TableContainer>
          </DivDespesas>

          <DivTitleReceitas>
            <Text fontSize="1.5rem">Receitas</Text>

            {!isMobile && (
              <Button
                onClick={() => setOpenNewRevenue(true)}
                leftIcon={
                  <IoMdAdd style={{ color: "white", height: 20, width: 25 }} />
                }
                colorScheme="green"
              >
                Nova receita
              </Button>
            )}
          </DivTitleReceitas>

          <DivReceitas>
            <TableContainer width="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th width="20%">Situação</Th>
                    <Th width="20%" isNumeric>
                      Data
                    </Th>
                    <Th width="30%">Descrição</Th>
                    <Th width="5%" isNumeric>
                      Valor
                    </Th>
                    <Th width="15%">Ações</Th>
                  </Tr>
                </Thead>

                {revenueData.length !== 0 ? (
                  revenueData.map((revenue: RevenueData) => {
                    return (
                      <Tbody key={revenue.id}>
                        <Tr>
                          <Td>
                            {revenue.status === false ? (
                              <Text color="red">Pendente</Text>
                            ) : (
                              <Text color="green">Recebida</Text>
                            )}
                          </Td>
                          <Td isNumeric>
                            {moment(revenue.created_at).format("DD/MM/YYYY")}
                          </Td>
                          {Number(revenue?.description?.length) >= 20 ? (
                            <Td>{revenue.description?.slice(0, 20)}...</Td>
                          ) : (
                            <Td>{revenue.description}</Td>
                          )}
                          <Td color="green">
                            {formatCurrency(String(revenue?.balance))}
                          </Td>
                          <Td>
                            <DivAcoes>
                              <Tooltip
                                label="Receber receita"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenReceiveRevenue(true);
                                    setUpdateRevenueData(revenue);
                                  }}
                                  isDisabled={revenue.status !== false}
                                >
                                  <FiCheckCircle
                                    cursor="pointer"
                                    aria-label="Receive revenue"
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                label="Editar receita"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenEditRevenue(true);
                                    setUpdateRevenueData(revenue);
                                  }}
                                >
                                  <FiEdit
                                    cursor="pointer"
                                    aria-label="Edit revenue"
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                label="Excluir receita"
                                aria-label="A tooltip"
                              >
                                <IconButton
                                  aria-label="Icon Button"
                                  onClick={() => {
                                    setOpenDeleteRevenue(true);
                                    setUpdateRevenueData(revenue);
                                  }}
                                >
                                  <AiOutlineDelete
                                    cursor="pointer"
                                    aria-label="Delete revenue"
                                  />
                                </IconButton>
                              </Tooltip>
                            </DivAcoes>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })
                ) : (
                  <Text p="6">Você não possui receitas cadastradas.</Text>
                )}
              </Table>
            </TableContainer>
          </DivReceitas>
        </RightBox>
      </Container>
    </>
  );
}
