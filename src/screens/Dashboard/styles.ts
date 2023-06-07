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
`;

export const DivCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 32%;
  height: 6rem;
  border-radius: 1.5rem;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  @media (max-width: 1024px){
    margin-bottom: 1rem;
    width: 80%;
  }
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const CardRight = styled.div``;


export const DivBaseTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DivTitleDespesas = styled(DivBaseTitle)`
  width: 100%;
`;

export const DivTitleReceitas = styled(DivBaseTitle)`
  width: 100%;
`;

export const DivBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  min-height: 16rem;
  border-radius: 1.5rem;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-top: 2rem;
`;

export const DivDespesas = styled(DivBase)`
  margin-bottom: 2rem;
`;

export const DivReceitas = styled(DivBase)`
  margin-bottom: 2rem;
`;

export const DivAcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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