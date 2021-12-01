import styled from 'styled-components';
import Logo from './Logo';
import AuthNav from './AuthNav';
import UserNav from './UserNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';
import Burger from './Burger';
import { useAuth } from '../context/AuthProvider';

/* interface Payload {
  username:string;
  id:string;
  iat:number;
  exp:number

}

interface Expired {
  expiredAt: string;
  message: string;
  name: string;
}

interface IsAuthType {
  isAuth:boolean;
  payload:Payload;
  expired:Expired;
} */

type HeaderTypes = {
  handleBurger:(toggle:boolean)=>void;
  toggleBurger:boolean;
  handleShowModal:(modal:string)=>void;
  isAccepted:boolean
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


const Header:React.FC<HeaderTypes> = ({handleBurger,toggleBurger,handleShowModal,isAccepted}) => {

    return (
        <>
          <HeaderContainer>
              <Burger handleBurger={(toggle:boolean)=>handleBurger(toggle)} toggleBurger={toggleBurger}/>
              <Logo/>
              <HeaderNav>
                { isAccepted ?
                  <UserNav/>
                  :
                  <AuthNav handleShowModal={(modal)=>handleShowModal(modal)}/>

                }
                <DotsButton><FontAwesomeIcon icon={faEllipsisV} /></DotsButton>
              </HeaderNav>
            
          </HeaderContainer>
          
           
        </>
    )
}

export default Header ;