import { useState, useRef, ChangeEvent } from "react";
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
  DivAcoes,
  DivSwitch,
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
  useDisclosure,
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
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [value, setValue] = useState("");

  const formatCurrency = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(formatCurrency(inputValue));
  };

  const renderNewExpense = () => {
    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Despesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="currency" mb="2rem">
              <Input
                variant="flushed"
                type="text"
                value={value}
                onChange={handleChange}
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
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      {renderNewExpense()}
      <Container>
        <SideMenu/>

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
                    <Link to="/profile">
                      <MenuItem>
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
                    </Link>

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
                  <MenuItem onClick={onOpen}>
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

                  <MenuItem>
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
                  <MenuItem onClick={onOpen}>
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

                  <MenuItem>
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
                          cursor="pointer"
                          as={FiCheckCircle}
                          w="1rem"
                          h="1rem"
                        />
                        <Icon cursor="pointer" as={FiEdit} w="1rem" h="1rem" />
                        <Icon
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
        </RightBox>
      </Container>
    </>
  );
}
