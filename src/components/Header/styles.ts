import styled from "styled-components";

export const Cabecalho = styled.header`
    grid-area: header;
    padding: 2rem;
    width: 100%;
    background-color: #eee;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 7.5rem;
        height: 2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
`;