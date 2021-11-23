import styled,{ createGlobalStyle } from "styled-components";
import { device } from "./mediaqueries";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: .625em; /* fallback IE8+ */
        font-size: calc(1em * .625); /* IE9-IE11 math fixing. See http://bit.ly/1g4X0bX */
        scroll-behavior: smooth;
    }

    /* Box sizing rules */
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }

    /* Remove focus for mouse users */
    :focus:not(:focus-visible) {
    outline: none;
    }

    /* Set core body defaults */
    body {
    min-height: 100vh;
    font-size: 1.6rem;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    color: #000;
    }

    /* Set text selection */

    ::-moz-selection {
    color: #000;
    background-color: #fd0;
    }

    ::selection {
    color: #000;
    background-color: #fd0;
    }

    /* Remove default margin */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul,
    ol[class],
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
    margin: 0;
    }

    /* Remove default padding */
    ul[class],
    ol[class] {
    padding: 0;
    }

    /* Remove list styles on ul, ol elements with a class attribute */
    ul[class],
    ol[class] {
    list-style: none;
    }

    /* A elements that don't have a class get default styles */
    a:not([class]) {
    text-decoration-skip-ink: auto;
    }

    /* Make medias easier to work with */
    img,
    video,
    audio {
    max-width: 100%;
    display: block;
    height: auto;
    }

    /* Natural flow and rhythm in articles by default 
        Pose des problèmes - intéressant mais difficile à utiliser */
    /* article > * + * {
    margin-top: 1em;
    } */

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
    font: inherit;
    }

    /* Set cursor pointer */
    label[for],
    button,
    input[type="submit"],
    select {
    cursor: pointer;
    }

    /* Remove font style on address */
    address {
    font-style: normal;
    }

    /* Remove all animations and transitions for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    }

    /* Text meant only for screen readers. */
    .screen-reader-text {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    width: 1px;
    position: absolute;
    white-space: nowrap;
    }

    /* Image replacement technique 2012 H5BP  - https://css-tricks.com/the-image-replacement-museum/ */

    .ir {
    font: 0/0 a;
    color: transparent;
    border: 0;
    text-shadow: none;
    }

    /* Phone links active only under 36em (576px) */
    a[href^="tel"] {
    white-space: nowrap;
    pointer-events: none;
    text-decoration: none;
    color: inherit;
    }

    @media (max-width: 36em) {
    a[href^="tel"] {
        pointer-events: auto;
        text-decoration: underline;
    }
    }

    /* Print external URLs */
    @media print {
    a {
        text-decoration: underline;
    }

    a[href]:not([href^='#'])::after {
        content: '('attr(href)')';
    }
    }
`
export const MainContainer=styled.div`
        max-width:74.38vw;
        margin:0 auto;
    @media ${device.tablet}{
        max-width:89.93vw;
    }
    @media ${device.laptopL}{
        max-width:87.64vw;
    }
`
export default GlobalStyle