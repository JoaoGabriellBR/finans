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
  DivAcoes
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
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Th,
  Td,
  Tr,
} from "@chakra-ui/react";
import { SiStarlingbank } from "react-icons/si";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import logo from "../../assets/logo.png";
import { IoIosAdd } from "react-icons/io";
import { FiCheckCircle, FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function Dashboard() {
  return (
    <>
      <Container>
        <LeftBox>
          <img className="logo" alt="logo" src={logo} loading="lazy" />
          <Button
            leftIcon={<Icon as={IoIosAdd} w="2rem" h="2rem" color="#FFFFFF" />}
            mt="2rem"
            width="80%"
            borderRadius="2rem"
            colorScheme="blue"
            variant="solid"
          >
            Novo
          </Button>
        </LeftBox>

        <RightBox>
          <Header>
            <Text fontSize="1.5rem">Dashboard</Text>
            <Menu>
              <MenuButton>
                <Avatar w={10} h={10} bg="#3182CE" />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem>Meu Perfil</MenuItem>
                  <MenuItem>Sair</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
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
            <h1>Junho de 2023</h1>

            <TableContainer width="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th width="20%">Situação</Th>
                    <Th width="20%" isNumeric>Data</Th>
                    <Th width="30%">Descrição</Th>
                    <Th width="5%" isNumeric>Valor</Th>
                    <Th width="15%">Ações</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>Pendente</Td>
                    <Td isNumeric>04/06/2023</Td>
                    <Td>Algar telecom</Td>
                    <Td>R$ 31,03</Td>
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
