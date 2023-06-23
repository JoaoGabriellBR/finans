import { GlobalStyle } from "./styles/globalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/routes";

function App() {
  return (
    <>
      <ChakraProvider>
        <GlobalStyle />
        <Routes />
      </ChakraProvider>
    </>
  );
}

export default App;
