import React,{useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import pp from '../assets/image/profile_picture.png';
import { device } from '../styles/mediaqueries';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

type Toggle = {
    toggle:boolean;
}

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
const Chevron = styled(FontAwesomeIcon)<Toggle>`
    transition:0.3s;
    transform: ${({toggle})=>toggle ? "rotate(180deg)":"rotate(0)" };
`
const ProfilNav = styled.ul<Toggle>`
    position:absolute;
    display:${({toggle})=>toggle? "block":"none"};
    background-color:#ffffff;
    top:5rem;
    right:0rem;
    z-index:30;
`
const NavProfilLink = styled.li`
        padding:1rem 1.6rem;
        border-bottom:0.1rem solid #000000; 
        cursor: pointer;
        &:hover{
            background-color:#A6AAFF;
        }
`


const UserNav = () => {
    const {currentUser,logout} = useAuth()
    const navigate = useNavigate()
    const [toggleProfilBurger,setToggleProfilBurger]= useState<boolean>(false)

    const handleLogout = () =>{
        logout()
        navigate('/home')
    }

    return (
        <Nav>
            <ProfilNav toggle={toggleProfilBurger}>
                <NavProfilLink onClick={()=>navigate(`/user/${currentUser?.payload.username}`)}>Voir mon profil</NavProfilLink>
                <NavProfilLink>Modifier mon Profil</NavProfilLink>
                <NavProfilLink onClick={()=>navigate('/new')} >Créer un nouveau Script</NavProfilLink>
                <NavProfilLink onClick={()=>handleLogout()} >Se déconnecter</NavProfilLink>
            </ProfilNav>
            <Button><FontAwesomeIcon icon={faBell} /></Button>
            <Button>
                <Picture>
                    <Img src={pp} alt="Profil" loading="lazy"/>
                </Picture>
                <Chevron icon={faChevronUp} onClick={()=>setToggleProfilBurger(!toggleProfilBurger)} toggle={toggleProfilBurger}/>
            </Button>
        </Nav>
    )
}

export default UserNav
