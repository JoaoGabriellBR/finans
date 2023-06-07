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

export const DivCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 23rem;
  max-width: 80%;
  height: 15rem;
  border-radius: 1.5rem;
  padding: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    margin-right: 0;
  }
`;

export const CardNovaConta = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3182ce;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transition: ease-in-out 0.3s;
  }
`;

export const CardContas = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .div-nome-conta,
  .div-saldo-atual,
  .div-saldo-previsto {
    width: 100%;
    min-height: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .div-carteira {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const DivSwitch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  .div-switch-icon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
