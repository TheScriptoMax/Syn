import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp}  from '@fortawesome/free-solid-svg-icons';

interface GoTopStyle {
    goTop:boolean;
}

interface GoTopProps{
    showGoTop:boolean;
    scrollUp:()=>void
}
const GoTop = styled.div<GoTopStyle>`
    position:fixed;
    bottom:5rem;
    right:5rem;
    width:5rem;
    height:5rem;
    background-color:#272727;
    border-radius:6rem;
    transition: display 0.5s;
    display:${({goTop})=>goTop ? "flex":"none"};
    justify-content:center;
    align-items:center;
    transition: transform 0.3s;
    opacity:0.4;
    cursor: pointer;
    &:hover{
        transform:scale(1.1)
    }
    @media ${device.tablet}{
        width:6rem;
        height:6rem;
        right:9rem;

    }
`;

const Button = styled.button`
    font-size:2rem;
    color:rgba(255,255,255,0.75);
    border:none;
    background-color:transparent;
    @media ${device.tablet}{
        font-size:2.5rem;

    }
`

const BackToTop:React.FC<GoTopProps> = ({showGoTop,scrollUp}) => {
    

    return (
        <GoTop goTop={showGoTop}>
            <Button onClick={()=>scrollUp()}>
                <FontAwesomeIcon icon={faArrowUp} size="lg" />
            </Button>
        </GoTop>
    )
}

export default BackToTop
