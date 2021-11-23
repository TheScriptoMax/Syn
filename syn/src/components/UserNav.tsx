import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import pp from '../assets/image/profile_picture.png';
import { device } from '../styles/mediaqueries';


const Nav = styled.nav`
    flex-shrink:1;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    @media ${device.tablet}{
        margin-right:0.8rem;
        justify-content:space-between;
        
    }
`

const Button = styled.button`
    border:none;
    background-color:transparent;
    display:flex;
    align-items:center;
    &:nth-child(1){
        display:none;
        font-size:2.6rem;
        @media ${device.tablet}{
            display:block;
        }
    }
    
`
const Picture = styled.picture`
    width:3.2rem;
    height:3.2rem;
    border-radius:2rem;
    margin-right:1rem;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Img = styled.img`
    width:100%;
`


const UserNav = () => {
    return (
        <Nav>
            <Button><FontAwesomeIcon icon={faBell} /></Button>
            <Button>
                <Picture>
                    <Img src={pp} alt="Profil" loading="lazy"/>
                </Picture>
                <FontAwesomeIcon icon={faChevronDown} />
            </Button>
        </Nav>
    )
}

export default UserNav
