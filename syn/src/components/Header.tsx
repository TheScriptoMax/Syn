import {useEffect, useState} from 'react'
import styled from 'styled-components';
import RegisterModal from '../modal/RegisterModal';
import LoginModal from '../modal/LoginModal';
import Logo from './Logo';
import { useApi } from '../context/ApiProvider';
import AuthNav from './AuthNav';
import UserNav from './UserNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';
import Burger from './Burger';

interface HeaderTypes {
  handleBurger:(toggle:boolean)=>void;
  toggleBurger:boolean;
}

const HeaderContainer = styled.header`
  width:100vw;
  height: 5rem;
  padding:0 2rem;
  border-bottom:1px solid #7A7979;
  display:flex;
  justify-content:space-between;
  align-items:center;
  /* box-shadow:0px 2px 2px rgba(0,0,0,0.25); */
`

const HeaderNav = styled.nav`
  display:flex;
  justify-content:space-between;
  align-items:center;
`


const DotsButton =styled.button`
  display:none;
  border:none;
  background-color:transparent;
  font-size:2rem;
  @media ${device.tablet}{
    display:block;
  }
`


const Header:React.FC<HeaderTypes> = ({handleBurger,toggleBurger}) => {
  const {api} = useApi()
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [showSignin, setShowSigin] = useState<boolean>(false)
  

  const isAuth = false

  useEffect(()=>{
    api.get(`/user`).then(res=>{
      console.log(res)
    })
  },[])

  const handleShowModal = (modal:string) => {
    if ( modal === "signup"){
      showSignin && setShowSigin(!showSignin);
      setShowSignup(!showSignup) ;
    }
    if ( modal === 'signin'){
      showSignup && setShowSignup(!showSignup);
      setShowSigin(!showSignin)
    }

  }


    return (
        <>
          <HeaderContainer>
              <Burger handleBurger={(toggle:boolean)=>handleBurger(toggle)} toggleBurger={toggleBurger}/>
              <Logo/>
              <HeaderNav>
                { isAuth ?
                  <UserNav/>
                  :
                  <AuthNav handleShowModal={(modal)=>handleShowModal(modal)}/>

                }
                <DotsButton><FontAwesomeIcon icon={faEllipsisV} /></DotsButton>
              </HeaderNav>
            
          </HeaderContainer>
          {
            showSignup && <RegisterModal/>
          }
          {
            showSignin && <LoginModal/>
          }
           
        </>
    )
}

export default Header ;