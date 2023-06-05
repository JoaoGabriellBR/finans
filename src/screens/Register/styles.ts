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
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Form = styled.form`
    min-height: 30rem;
    width: 30rem;
    max-width: 90%;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;
