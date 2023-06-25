import { GlobalStyle } from "./styles/globalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/routes";
import theme from "./styles/theme";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ChakraProvider>
    </>
  );
}

export default App;
