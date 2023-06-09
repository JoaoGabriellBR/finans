import { useState, ChangeEvent } from "react";
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
} from "./styles";
import {
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
  useMediaQuery,
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

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  const [openNewExpense, setOpenNewExpense] = useState(false);
  const [openPayExpense, setOpenPayExpense] = useState(false);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [openDeleteExpense, setOpenDeleteExpense] = useState(false);

  const [openNewRevenue, setOpenNewRevenue] = useState(false);
  const [openReceiveRevenue, setOpenReceiveRevenue] = useState(false);
  const [openEditRevenue, setOpenEditRevenue] = useState(false);
  const [openDeleteRevenue, setOpenDeleteRevenue] = useState(false);

  const [valueNewExpense, setValueNewExpense] = useState("");
  const [valueEditExpense, setValueEditExpense] = useState("");

  const [valueNewRevenue, setValueNewRevenue] = useState("");
  const [valueEditRevenue, setValueEditRevenue] = useState("");

  const formatCurrency = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  const handleChangeNewExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueNewExpense(formatCurrency(inputValue));
  };

  const handleChangeNewRevenue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueNewRevenue(formatCurrency(inputValue));
  };

  const handleChangeEditExpense = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueEditExpense(formatCurrency(inputValue));
  };

  const handleChangeEditRevenue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueEditRevenue(formatCurrency(inputValue));
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
            <FormControl id="currency" mb="2rem">
              <Input
                // disabled
                variant="flushed"
                type="text"
                // value={value}
                value="R$ 31,03"
                // onChange={handleChangeEditExpense}
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
              value="Algar telecom"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Pagar
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
                // value={value}
                value="R$ 31,03"
                onChange={handleChangeEditExpense}
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
              <Switch colorScheme="red" />
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
                  Algar telecom
                </Text>
              </Box>

              <Box>
                <Text fontSize="1rem">Valor</Text>
                <Text color="gray" fontSize="1rem">
                  R$ 31,03
                </Text>
              </Box>
            </DivDelete>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Excluir
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
                value={valueNewRevenue}
                onChange={handleChangeNewRevenue}
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
                // value={valueEditRevenue}
                value="R$ 50,00"
                onChange={handleChangeEditRevenue}
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
                // value={valueEditRevenue}
                value="R$ 50,00"
                onChange={handleChangeEditRevenue}
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

                    <MenuItem>
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

            <Card>
              <CardLeft>
                <Text fontSize="0.9rem" color="gray">
                  Despesas
                </Text>
                <Text fontSize="1.5rem">R$ 0,00</Text>
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
                    <Td>Algar telecom</Td>
                    <Td color="#f00">R$ 31,03</Td>
                    <Td>
                      <DivAcoes>
                        <Icon
                          onClick={() => setOpenPayExpense(true)}
                          cursor="pointer"
                          as={FiCheckCircle}
                          w="1rem"
                          h="1rem"
                        />
                        <Icon
                          onClick={() => setOpenEditExpense(true)}
                          cursor="pointer"
                          as={FiEdit}
                          w="1rem"
                          h="1rem"
                        />
                        <Icon
                          onClick={() => setOpenDeleteExpense(true)}
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
