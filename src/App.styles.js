import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins";
    text-align: center;
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.main}
  }
`;

export const AppContainer = styled.div`
  background-color: ${(props) => props.theme.secondary};
  background-color: white;
  border: 10px solid white;
  border-radius: 30px;
`;

export const lightTheme = {
  main: "#000000",
  secondary: "#FFFFFF",
};

export const darkTheme = {
  secondary: "#000000",
  main: "#FFFFFF",
};
