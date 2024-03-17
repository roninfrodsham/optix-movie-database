import styled from "@emotion/styled";

const baseHeader = `
  color: #005999;
  font-weight: 400;
`;

export const H1 = styled.h1`
  ${baseHeader}
  font-size: 2em;
`;

export const H2 = styled.h2`
  ${baseHeader}
  font-size: 1.4em;
  margin-bottom: 0;
`;

export const FormContainer = styled.div`
  @media (max-width: 600px) {
    background-color: white;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2em;
  }
`;
