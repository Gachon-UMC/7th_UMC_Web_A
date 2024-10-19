// body 스타일 기본 정의
import React from 'react';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #101010;
        overflow: hidden;
    }
`

export default GlobalStyle;