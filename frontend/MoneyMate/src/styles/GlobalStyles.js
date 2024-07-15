import {createGlobalStyle} from 'styled-components'
export const GlobalStyle = createGlobalStyle`
    *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    list-style:none;
    }
    :root{
        --primary-color : #222260;
        --primary-color2 : 'color :rgba(34,34,96,0.6)';
        --primary-color3 : 'color :rgba(34,34,96,0.4)';
        --primary-green : #42AD00;
        --primary-grey : #aaa;
        --primary-accent : #F56692;
        --primary-delete : #FF0000;
    }
    body{
        font-family:'Nunito',sans-serif;
        background-color: red;
        font-size: clamp(1rem,1.5vw,1.2rem);
        overflow : hidden;
        color: rgba(34,96,96,.6);
    }
`;