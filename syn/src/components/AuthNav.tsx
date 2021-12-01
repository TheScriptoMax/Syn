import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt,faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';

interface AuthNavTypes {
    handleShowModal:(modal:string)=>void;
}

const Nav = styled.nav`
    display:flex;
    flex-shrink:1;
    justify-content:space-between;
    align-items:center;
    @media ${device.tablet}{
        margin-right:0.8rem;
    }
`

const Button = styled.button`
    display:none;
    border:none;
    padding:0.6rem 1rem;
    border-radius:0.6rem;
    background-color:transparent;
    transition-duration:0.3s;
    &:hover{
        background-color:#EAE9E9;
    }
    &:nth-child(2){
        display:block;
        background-color:#A6AAFF;
        transition-duration:0.3s;
        &:hover{
            background-color:#979CFF;
        }
    }
    @media ${device.tablet}{
        display:block;
    }

`
const Span = styled.span`
    text-transform:uppercase;
    font-weight:600;
    margin-left:0.6rem;
    color:${({color})=>color};
`


const AuthNav:React.FC<AuthNavTypes> = ({children,handleShowModal}) => {
    
    return (
        <Nav>
            <Button onClick={()=>handleShowModal("signup")}><FontAwesomeIcon icon={faPenSquare} /><Span>Sign Up</Span></Button>
            <Button onClick={()=>handleShowModal("signin")}><FontAwesomeIcon icon={faSignInAlt} color="#ffffff" /><Span color="#ffffff">sign In</Span></Button>
            
        </Nav>
    )
}

export default AuthNav
