import { createGlobalStyle } from "styled-components";
import "./fontProvider.css";

export const GlobalStyle = createGlobalStyle`

    html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        color: #000;
        background-color: #eee;
        font-family: Codec Regular;
    }
`;
