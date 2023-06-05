import {
  Container,
  LeftBox,
  RightBox,
  Header,
  DivCards,
  Card,
  CardLeft,
  CardRight,
  DivDespesas,
  DivAcoes,
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
  useMediaQuery,
} from "@chakra-ui/react";
import { SiStarlingbank } from "react-icons/si";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import logo from "../../assets/logo.png";
import { FiCheckCircle, FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <Container>
        <LeftBox>
          <img className="logo" alt="logo" src={logo} loading="lazy" />

          {!isMobile && (
            <Menu>
              <MenuButton
                mt="2rem"
                width="80%"
                as={Button}
                rightIcon={<AiOutlineDown />}
                colorScheme="blue"
              >
                Novo
              </MenuButton>
              <MenuList>
                <MenuItem>
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

          {isMobile && (
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
          )}
        </LeftBox>

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
                  rightIcon={<AiOutlineDown />}
                  colorScheme="blue"
                >
                  Novo
                </MenuButton>
                <MenuList>
                  <MenuItem>
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

          <Text fontSize="1.5rem">Despesas</Text>

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
