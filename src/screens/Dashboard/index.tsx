import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
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
  FormControl,
  Input,
  Switch,
  Select,
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
import { formatCurrency, getNumericValue } from "../../utils/formatCurrency";
import api from "../../api";
import Cookies from "js-cookie";
import moment from "moment";

type BillData = {
  id: number;
  description: string;
};

interface ExpenseData {
  id?: number | undefined;
  description?: string | undefined;
  balance?: number | undefined;
  status?: boolean | undefined;
  created_at?: number | undefined;
}


export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingNewExpense, setLoadingNewExpense] = useState(false);
  const [loadingPayExpense, setLoadingPayExpense] = useState(false);
  const [loadingEditExpense, setLoadingEditExpense] = useState(false);
  const [loadingDeleteExpense, setLoadingDeleteExpense] = useState(false);
  const [loadingNewRevenue, setLoadingNewRevenue] = useState(false);

  const [billData, setBillData] = useState<BillData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [updateExpenseData, setUpdateExpenseData] = useState<ExpenseData>();
  const [selectedBill, setSelectedBill] = useState<string>("");

  const [openNewExpense, setOpenNewExpense] = useState(false);
  const [openPayExpense, setOpenPayExpense] = useState(false);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [openDeleteExpense, setOpenDeleteExpense] = useState(false);

  const [openNewRevenue, setOpenNewRevenue] = useState(false);
  const [openReceiveRevenue, setOpenReceiveRevenue] = useState(false);
  const [openEditRevenue, setOpenEditRevenue] = useState(false);
  const [openDeleteRevenue, setOpenDeleteRevenue] = useState(false);

  const [balanceNewExpense, setBalanceNewExpense] = useState('');
  const [balanceEditExpense, setBalanceEditExpense] = useState('');

  const [descriptionNewExpense, setDescriptionNewExpense] = useState('');
  const [descriptionEditExpense, setDescriptionEditExpense] = useState('');

  const [statusNewExpense, setStatusNewExpense] = useState(Boolean);
  const [statusEditExpense, setStatusEditExpense] = useState(Boolean);

  const [balanceNewRevenue, setBalanceNewRevenue] = useState('');
  const [balanceEditRevenue, setBalanceEditRevenue] = useState('');

  const [descriptionNewRevenue, setDescriptionNewRevenue] = useState('');
  const [descriptionEditRevenue, setDescriptionEditRevenue] = useState('');

  const [statusNewRevenue, setStatusNewRevenue] = useState(Boolean);
  const [statusEditRevenue, setStatusEditRevenue] = useState(Boolean);

  const [totalBalanceExpense, setTotalBalanceExpense] = useState<number>(0);

  const loadData = async () => {
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
    loadData();
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

  const calculateTotalBalanceExpense = () => {
    const sum = expenseData.reduce((accumulator, expense) => {
      if (expense.balance !== undefined) {
        return accumulator + expense.balance;
      } else {
        return accumulator;
      }
    }, 0);
    setTotalBalanceExpense(sum);
  };
  
  
  // Chamada da função para calcular o total das Despesas inicialmente
  useEffect(() => {
    calculateTotalBalanceExpense();
  }, [expenseData]);

  const handleChangeBalanceNewExpense = (e: ChangeEvent<HTMLInputElement>) => {
    setBalanceNewExpense(formatCurrency(e.target.value));
  };

  const handleChangeBalanceEditExpense = (e: ChangeEvent<HTMLInputElement>) => {
    const updateBalance = { ...updateExpenseData };
    updateBalance.balance = parseFloat(formatCurrency(e.target.value));
    setBalanceEditExpense(updateBalance);
  };

  const handleChangeDescriptionNewExpense = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionNewExpense(e.target.value);
  };

  const handleChangeStatusNewExpense = (e: any) => {
    setStatusNewExpense(e.target.value);
  };

  const handleNewExpense = async () => {
    setLoadingNewExpense(true);
    try {
      const numericValue = getNumericValue(balanceNewExpense);
      await api({
        method: "POST",
        url: "/expense/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          id_bill: selectedBill,
          balance: numericValue,
          description: descriptionNewExpense,
          status: statusNewExpense,
        },
      });

      setLoadingNewExpense(false);
      setOpenNewExpense(false);
      loadData();
      const successMessage = "Despesa criada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingNewExpense(false);
      setOpenNewExpense(false);
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
      loadData();
      const successMessage = "Despesa paga com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingPayExpense(false);
      setOpenPayExpense(false);
      const errorMessage = error?.response?.data?.error || "Não foi possível pagar a despesa.";
      notification(toast, errorMessage, "error");
    }
  };

  const handleEditExpense = async () => {
    setLoadingEditExpense(true);
    try {
      await api({
        method: "PATCH",
        url: `/expense/update/${updateExpenseData?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("finans-authtoken"),
        },
        data: {
          ...updateExpenseData,
          balance: updateExpenseData?.balance,
          description: updateExpenseData?.description,
          status: updateExpenseData?.status,
        }
      });
      setLoadingEditExpense(false);

      setOpenEditExpense(false);
      loadData();
      const successMessage = "Despesa atualizada com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingEditExpense(false);
      setOpenEditExpense(false);
      const errorMessage = error?.response?.data?.error || "Não foi possível atualizar a despesa.";
      notification(toast, errorMessage, "error");
    }
  }

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
      loadData();
      const successMessage = "Despesa excluída com sucesso.";
      notification(toast, successMessage, "success");
    } catch (error: any) {
      setLoadingDeleteExpense(false);
      setOpenDeleteExpense(false);
      const errorMessage = error?.response?.data?.error || "Não foi possível excluir a despesa.";
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
            <FormControl id="currency" mb="1.5rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "#f00" }}
                fontSize="1.5rem"
                color="#f00"
                value={`R$ ${balanceNewExpense}`}
                onChange={handleChangeBalanceNewExpense}
              />
            </FormControl>

            <Input
              mb="1.5rem"
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
              value={descriptionNewExpense}
              onChange={handleChangeDescriptionNewExpense}
            />

            <Select
              mb="1.5rem"
              variant="flushed"
              placeholder="Selecione uma conta"
              value={selectedBill}
              onChange={(e) => setSelectedBill(e.target.value)}
            >
              {billData.map((bill: BillData) => (
                <option key={bill.id} value={bill.id}>
                  {bill.description}
                </option>
              ))}
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
                <Text fontSize="1rem">Não foi paga</Text>
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
            <Button onClick={() => setOpenNewExpense(false)}>Cancelar</Button>
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
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "#f00" }}
                fontSize="1.5rem"
                color="#f00"
                value={`R$ ${updateExpenseData?.balance}`}
                onChange={handleChangeBalanceEditExpense}
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
              value="Algar telecom"
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
            <Button colorScheme="red" mr={3}>
              Salvar
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
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "green" }}
                fontSize="1.5rem"
                color="green"
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
                <Text fontSize="1rem">Não foi recebida</Text>
              </div>
              <Switch colorScheme="green" />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Salvar
            </Button>
            <Button onClick={() => setOpenNewRevenue(false)}>Cancelar</Button>
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
              Ao efetivar essa receita será adicionado o valor na conta.
            </Text>
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "green" }}
                fontSize="1.5rem"
                color="green"
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
              value="Receita de teste"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Receber
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
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                placeholder="R$ 0,00"
                _placeholder={{ color: "green" }}
                fontSize="1.5rem"
                color="green"
              />
            </FormControl>

            <Input
              variant="flushed"
              type="text"
              placeholder="Descrição"
              maxLength={500}
              value="Receita de teste"
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
                <Text fontSize="1rem">Não foi recebida</Text>
              </div>
              <Switch colorScheme="green" />
            </DivSwitch>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Salvar
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
                  Receita de teste
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ 50,00
                </Text>
              </Box>
            </DivDelete>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Excluir
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
                  <Text fontSize="1.5rem">R$ 680,00</Text>
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
                  <Text fontSize="1.5rem">R$ 0,00</Text>
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
                  <Text fontSize="1.5rem">R$ {totalBalanceExpense.toFixed(2)}</Text>
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
            <Text fontSize="1rem" mb="2rem">
              Junho de 2023
            </Text>

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

                {expenseData.map((expense: ExpenseData) => {
                  return (
                    <Tbody key={expense.id}>
                      <Tr>
                        <Td>
                          {expense.status === false ? (
                            <Text color="red">Pendente</Text>
                          ) : (
                            <Text color="green">Pago</Text>
                          )}
                        </Td>
                        <Td isNumeric>
                          {moment(expense.created_at).format("DD/MM/YYYY")}
                        </Td>
                        <Td>{expense.description}</Td>
                        <Td color="#f00">R$ {expense.balance}</Td>
                        <Td>
                          <DivAcoes>
                            <Icon
                              disabled={expense.status === true}
                              onClick={() => {
                                setOpenPayExpense(true);
                                setUpdateExpenseData(expense);
                              }}
                              cursor="pointer"
                              as={FiCheckCircle}
                              w="1rem"
                              h="1rem"
                            />
                            <Icon
                              onClick={() => {
                                setOpenEditExpense(true);
                                setUpdateExpenseData(expense);
                              }}
                              cursor="pointer"
                              as={FiEdit}
                              w="1rem"
                              h="1rem"
                            />
                            <Icon
                              onClick={() => {
                                setOpenDeleteExpense(true);
                                setUpdateExpenseData(expense);
                              }}
                              cursor="pointer"
                              as={AiOutlineDelete}
                              w="1rem"
                              h="1rem"
                            />
                          </DivAcoes>
                        </Td>
                      </Tr>
                    </Tbody>
                  );
                })}
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
            <Text fontSize="1rem" mb="2rem">
              Junho de 2023
            </Text>

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

                <Tbody>
                  <Tr>
                    <Td>Pendente</Td>
                    <Td isNumeric>04/06/2023</Td>
                    <Td>Receita de teste</Td>
                    <Td color="green">R$ 50,00</Td>
                    <Td>
                      <DivAcoes>
                        <Icon
                          onClick={() => setOpenReceiveRevenue(true)}
                          cursor="pointer"
                          as={FiCheckCircle}
                          w="1rem"
                          h="1rem"
                        />
                        <Icon
                          onClick={() => setOpenEditRevenue(true)}
                          cursor="pointer"
                          as={FiEdit}
                          w="1rem"
                          h="1rem"
                        />
                        <Icon
                          onClick={() => setOpenDeleteRevenue(true)}
                          cursor="pointer"
                          as={AiOutlineDelete}
                          w="1rem"
                          h="1rem"
                        />
                      </DivAcoes>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </DivReceitas>
        </RightBox>
      </Container>
    </>
  );
}
