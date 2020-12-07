import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`${css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    color: rgba(38, 38, 38);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif;
    font-size: 1.4rem;
    outline: none;
    /* font-size: 1.6rem; */
    /* line-height: 2.4rem; */
  }
`}`;

export default GlobalStyle;
