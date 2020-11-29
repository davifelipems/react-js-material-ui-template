import { createGlobalStyle } from "styled-components"

import "font-awesome/css/font-awesome.css"

export const GlobalStyle = createGlobalStyle`
*{
    font-family: 'Roboto', sans-serif;
}
a{
    text-decoration: none;
    color: #999;
    transition: .3s;
  }
`;
