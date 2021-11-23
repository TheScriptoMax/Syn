import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';

interface SpanTypes {
    toggle:boolean;
}

interface BurgerTypes {
    handleBurger:(toggleBurger:boolean)=>void;
    toggleBurger:boolean
}
const Wrapper = styled.div`
    position:relative;
    flex-shrink:1;
    width:2rem;
    height:2rem;
    margin-right:3rem;
    background-color:transparent;
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    @media ${device.tablet}{
        display:none;
    }
`
const Bar = styled.span<SpanTypes>`
    position:relative;
    background-color:${(props)=>props.toggle?"transparent":"#000000"};
    width:2rem;
    border-radius:0.2rem;
    height:3px;
    display:inline-block;
    transition:0.2s;
    &::before,&::after{
        content:"";
        position:absolute;
        top:0;
        left:0;
        border-radius:0.2rem;
        background-color:#000000;
        width:2rem;
        height:3px;
        display:inline-block;
        transition:0.3s;
    };
    &::after{
        top:${(props)=>props.toggle?"0rem":"0.6rem"};
        transform:${(props)=>props.toggle?"rotate(135deg)":"rotate(0)"};
    };
    &::before{
        top:${(props)=>props.toggle?"0rem":"-0.6rem"};
        transform:${(props)=>props.toggle?"rotate(-135deg)":"rotate(0)"};
    }
`

const Burger:React.FC<BurgerTypes> = ({handleBurger,toggleBurger}) => {
    
    return (
        <Wrapper onClick={()=>handleBurger(!toggleBurger)}>
            <Bar toggle={toggleBurger}/>
            
        </Wrapper>
    )
}

export default Burger
