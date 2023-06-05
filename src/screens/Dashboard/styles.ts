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

export const LeftBox = styled.div`
  grid-area: leftbox;
  padding: 2rem;
  height: 100%;
  background-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1024px){
    flex-direction: row;
    justify-content: space-between;
  }

  .logo {
    width: 7.5rem;
    height: 2rem;
    cursor: pointer;
    padding: 0;
    margin: 0;
}
`;

export const RightBox = styled.div`
  grid-area: rightbox;
  padding: 2rem;
  height: 100%;
  background-color: #ecf4fc;
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


export const DivDespesas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  min-height: 16rem;
  border-radius: 1.5rem;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-top: 2rem;
`;

export const DivAcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;