import {useState,useEffect} from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import RegisterModal from '../modal/RegisterModal';
import LoginModal from '../modal/LoginModal';
import { useAuth } from '../context/AuthProvider'
/* import { useApi } from '../context/ApiProvider'; */

interface Payload {
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
}
type PromiseSignIn ={
    res:IsAuthType;
    /* reject: */
}

const GlobalHeader = () => {
    const {signIn,currentUser} = useAuth()
    const [toggleBurger,setToggleBurger]= useState<boolean>(false)
    const [showSignup, setShowSignup] = useState<boolean>(false)
    const [showSignin, setShowSignin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [isAccepted, setIsAccepted] = useState<boolean>(false)
    
    
    useEffect(()=>{
        
        if(currentUser?.isAuth){
            setIsAccepted(true)
            setLoading(true)
            
        }else{
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])

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

    const handleSignIn = (login:string,password:string)=>{
        signIn(login,password)
        setShowSignin(!showSignin)
    }
    return (
        <>
            <Header handleBurger={(toggle)=>setToggleBurger(toggle)} toggleBurger={toggleBurger} handleShowModal={(modal)=>handleShowModal(modal)} isAccepted={isAccepted}/>
            <SubHeader isOpen={toggleBurger}/>
            {
                showSignup && <RegisterModal handleCloseModal={(modal)=>setShowSignup(modal)} modal={showSignup}/>
            }
            {
                showSignin && <LoginModal handleShowModal={(modal)=>{handleShowModal(modal)}} handleCloseModal={(modal)=>setShowSignin(modal)} modal={showSignin} handleSignIn={(login,password)=>handleSignIn(login,password)}/>
            }
        </>
    )
}

export default GlobalHeader
