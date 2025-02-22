import { createGlobalStyle, css } from "styled-components";
import { laptop } from "./breakpoints";

const styling = css`
  :root {
    --primary: #28cb8b;
    --secondary: #263238;
    --info: #2194f3;
    --secondary: #a0a4b8;
    --warning: #fbc02d;
    --error: #e53835;
    --success: #2e7d31;
    --black: #263238;
    --dgrey: #4d4d4d;
    --grey: #717171;
    --lgrey: #89939e;
    --gblue: #abbed1;
    --silver: #f5f7fa;
    --white: #ffffff;

    --shade1: #43a046;
    --shade2: #388e3b;
    --shade3: #237d31;
    --shade4: #1b5e1f;
    --shade5: #103e13;

    --tint1: #66bb69;
    --tint2: #81c784;
    --tint3: #a5d6a7;
    --tint4: #c8e6c9;
    --tint5: #e8f5e9;
  }
`;
export const GlobalStyle = createGlobalStyle`
   
    ${styling}
    * {
        box-sizing: border-box; 
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    html, body {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
    body > div {
        position: relative;
        overflow-x: hidden;
    }
    *,button,body,input,textarea {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: inherit;
    }
    body {
        background: var(--white);
        color: var(--black);
        font-size: 14px;
        ::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    h1, h2, h3, h4 {
        font-weight: 600;
    }
    h1 {
        font-size: 72px;
        /* line-height: 124%; */
    }
    h2 {
        font-size: 60px;
    }
    h3 {
        font-size: 48px;
    }
    h4 {
        font-size: 32px;
    }
    h5 {
        font-size: 24px;
    }
    p {
        font-size: 20px;
    }
    span, p, h3, h4 {
        line-height: 1.5;
    }

    @media ${laptop} {
        h1 {
            font-size: 52px;
        }
        h2 {
            font-size: 40px;
        }
        h3 {
            font-size: 34px;   
        }
        h5 {
            font-size: 24px;
        }
        p {
            font-size: 16px;
        }
    }
    .pac-container {
    background-color: #fff !important;
    border-radius: 5px !important;
    border: 1px solid var(--primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    z-index: 10000 !important;
  }

  .pac-item {
    padding: 12px !important;
    font-size: 16px !important;
    color: #333 !important;
  }

  .pac-item:hover {
    background-color: #f0f0f0 !important;
  }

  .pac-item-query {
    color: var(--dgrey) !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    margin-right: 5px !important;
  }
  .pac-icon {
    display: none !important;
  }
 
`;
