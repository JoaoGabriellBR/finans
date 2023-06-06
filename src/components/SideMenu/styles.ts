import styled from "styled-components";

export const LeftBox = styled.div`
  grid-area: leftbox;
  height: 100%;
  background-color: transparent;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
  }

  .logo {
    width: 7.5rem;
    height: 2rem;
    cursor: pointer;
    padding: 0;
    margin-left: 2rem;
    margin-top: 2rem;

    @media (max-width: 1024px){
      margin: 0;
      padding: 0;
    }
  }

  .div-minhas-contas {
    padding: 1rem 0 1rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    &:hover{
      background-color: #eee;
    }
  }
`;

export const DivMenuMobile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;