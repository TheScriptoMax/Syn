import {useState,useEffect} from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import RegisterModal from '../modal/RegisterModal';
import LoginModal from '../modal/LoginModal';
/* import { useApi } from '../context/ApiProvider'; */

const GlobalHeader = () => {
    /* const {api} = useApi() */
    const [toggleBurger,setToggleBurger]= useState<boolean>(false)
    const [showSignup, setShowSignup] = useState<boolean>(false)
    const [showSignin, setShowSignin] = useState<boolean>(false)
    

    const isAuth = false
    
    useEffect(()=>{
        if (showSignin|| showSignup){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'unset';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleShowModal = (modal:string) => {
        if ( modal === "signup"){
        showSignin && setShowSignin(!showSignin);
        setShowSignup(!showSignup) ;
        }
        if ( modal === 'signin'){
        showSignup && setShowSignup(!showSignup);
        setShowSignin(!showSignin)
        }

    }
    return (
        <>
            <Header handleBurger={(toggle)=>setToggleBurger(toggle)} toggleBurger={toggleBurger} handleShowModal={(modal)=>handleShowModal(modal)} isAuth={isAuth}/>
            <SubHeader isOpen={toggleBurger}/>
            {
                showSignup && <RegisterModal handleCloseModal={(modal)=>setShowSignup(modal)} modal={showSignup}/>
            }
            {
                showSignin && <LoginModal handleShowModal={(modal)=>{handleShowModal(modal)}} handleCloseModal={(modal)=>setShowSignin(modal)} modal={showSignin}/>
            }
        </>
    )
}

export default GlobalHeader
