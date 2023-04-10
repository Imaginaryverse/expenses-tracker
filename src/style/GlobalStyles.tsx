import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

  }

  html,
  body {
    color: ${({ theme }) => theme.colors.body.text};
    background-color: ${({ theme }) => theme.colors.body.background};
    
    
    font-size: 16px;
    font-family: sans-serif;
    line-height: 1.5;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    scroll-behavior: smooth;

    /* @media screen and (max-width: 1024px) {
      font-size: 14px;
    } */

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }

  .App {
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
  }

  input, button {
    font-size: 1rem;
  }
`;
