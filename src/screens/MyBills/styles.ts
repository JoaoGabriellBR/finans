import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-color: #fff;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "leftbox rightbox rightbox rightbox rightbox"
    "leftbox rightbox rightbox rightbox rightbox";

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "leftbox leftbox"
      "rightbox rightbox";
  }
`;

export const RightBox = styled.div`
  grid-area: rightbox;
  padding: 2rem;
  height: 100%;
  background-color: #eee;
  border-top-left-radius: 2rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .div-minhas-contas {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;
