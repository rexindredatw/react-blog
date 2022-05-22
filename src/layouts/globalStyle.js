import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding-top: 64px;
    height: 100%;
    font-family: 'Hind Siliguri', sans-serif;
    font-weight: 400;
    background: ${({ theme }) => theme.background.body};
    transition: all 0.5s linear;
  }
  * {
    box-sizing: border-box;
    font-size: 16px;
  }
  h1, p {
    margin: 0;
  }
  input,
  input[type="button"],
  input[type="submit"],
  input[type="file"],
  input[type="reset"],
  button,
  textarea,
  select {
    margin: 0;
    padding: 0;
    outline: none;
    line-height: 1.5;
    letter-spacing: 1px;
    appearance: none;
    -webkit-appearance: none;
  }
  input, textarea {
    resize: none;
  }
`;

export default GlobalStyle;
