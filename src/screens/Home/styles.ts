import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 
        "header header"
        "section section"
  ;
`;

export const Section = styled.section`
  grid-area: section;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: #eee;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px){
    flex-direction: column;
    justify-content: center;
}

.div-text {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    
    @media (max-width: 1024px){
        width: 100%;
        text-align: center;
        align-items: center;
    }
  }

  .div-image {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px){
        width: 100%;
        margin-top: 3rem;
    }
  }
`;
