import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-color: #fff;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "header header"
    "section section";
`;

export const Header = styled.div`
  grid-area: header;
  padding: 2rem;

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

export const Section = styled.section`
  grid-area: section;
  padding: 2rem 5rem;
  background-color: #ecf4fc;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 1024px){
    padding: 2rem;
  }

  .div-meu-perfil,
  .div-dados-pessoais,
  .div-alterar-senha {
    width: 100%;
    /* background-color: #ff0; */
    margin-bottom: 2rem;
  }

  .div-dados-pessoais,
  .div-alterar-senha {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .div-meu-perfil {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .div-form {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2rem;

    @media (max-width: 1024px){
      width: 100%;
    }
  }
`;
