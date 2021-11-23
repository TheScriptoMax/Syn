import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faNewspaper,faCalendarAlt,faBell  } from '@fortawesome/free-regular-svg-icons';
import { faBook,faPodcast,faBlog } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';

interface NavBarTypes {
    isOpen:boolean
}
const Nav = styled.nav<NavBarTypes>`
    position:relative;
    top:0;
    left:${({isOpen})=>isOpen?'0':'-100rem'};
    background-color:#ffffff;
    width:100vw;
    transition:0.2s;
    @media ${device.tablet}{
        width:64.86vw;
        margin:0 auto;
        top:0;
        left:0;
        display:block;   
    }    
`;

const NavHeader = styled.div`
    height:4.7rem;
    border-bottom: 1px solid #7A7979;
    display:flex;
    justify-content:flex-start;
    @media ${device.tablet}{
        display:none;   
    } 
`;

const Button = styled.button`
    border:none;
    background-color:transparent;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:2.4rem;
    padding:0 2rem;
    border-right: 1px solid #7A7979;
`;

const Wrapper = styled.ul`
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    
    @media ${device.tablet}{
        flex-direction:row;
    }
`
const NavItem = styled.li`
    background-color:transparent;
    width:100vw;
    padding:1rem 1.6rem;
    transition-duration:0.2s;
    display:flex;
    justify-content:flex-start;
    &:hover{
        background-color:#EAE9E9;
    }
    @media ${device.tablet}{
        justify-content:center;
        border-radius:0.8rem;
        padding:0.6rem 1.8rem;
        margin-bottom:0;
    }
`
const NavButton = styled(Link)`
    cursor: pointer;
    text-decoration:none;
    color:#000000;
    display:flex;
    justify-content:center;
    align-items:center;
    @media ${device.tablet}{
        
    }
    
`
const Span = styled.span`
    font-weight:600;
    font-size:1.8rem;
    text-transform:uppercase;
    margin-left:1rem;

`

const NavBar:React.FC<NavBarTypes> =({isOpen}) =>{
    return (
        <Nav isOpen={isOpen}>
            <NavHeader>
                <Button><FontAwesomeIcon icon={faBell} /></Button>
            </NavHeader>
            <Wrapper>
                <NavItem>
                    <NavButton to='/'>
                        <FontAwesomeIcon icon={faNewspaper} size="lg" />
                        <Span>News</Span>
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton to='/'>
                        <FontAwesomeIcon icon={faBlog} size="lg" />
                        <Span>blog</Span>
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton to='/'>
                        <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                        <Span>agenda</Span>
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton to='/'>
                        <FontAwesomeIcon icon={faPodcast} size="lg" />
                        <Span>podcasts</Span>
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton to='/'>
                        <FontAwesomeIcon icon={faBook} size="lg" />
                        <Span>livres</Span>
                    </NavButton>
                </NavItem>
            </Wrapper>
        </Nav>
    )
}

export default NavBar
