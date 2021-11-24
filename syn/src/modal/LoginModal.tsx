
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignInAlt,faTimes } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';

type LoginPropsTypes = {
    handleShowModal:(modal:string)=>void;
    handleCloseModal:(modal:boolean)=>void;
    modal:boolean;
}
const ShadowBackground=styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.75);
    z-index:15;
`
const Container = styled.div`
    position:absolute;
    width:100vw;
    height:50rem;
    top:5rem;
    left:0;
    padding:2.6rem 2.8rem;
    border-radius:2rem;
    background-color:#7D80B3;
    z-index:30;
    @media ${device.tablet}{
        left:19vw;
        width:62vw;
        padding:2.6rem 4.8rem;
    }
    @media ${device.laptopL}{
        left:28vw;
        width:45vw;
        padding:2.6rem 4.8rem;

    }
`
const StyledForm = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:flex-start;
    margin-bottom:4rem;
`

const Title = styled.h2`
    font-size:3rem;
    font-weight:700;
    color:#ffffff;
    text-align:center;
    @media ${device.tablet}{
        text-align:left;  
    }
`
const ModalHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:2rem;
`
const CloseButton = styled.button`
    border:none;
    background-color:transparent;
    color:#ffffff;
    font-size:3rem;
`
const Label = styled.label`
    font-size:1.8rem;
    font-weight:700;
    color:#ffffff;
    margin-bottom:0.8rem;
`
const StyledInput = styled.input`
    width:100%;
    padding: 1rem 2rem;
    border-radius:0.4rem;
    outline:none;
    border:none;
    margin-bottom:3rem;
    &:nth-child(4){
        margin-bottom:5rem;
    }
`
const Button = styled.button`
    width:70%;
    height:4.5rem;
    margin:0 auto;
    background-color:transparent;
    border:1px solid #ffffff;
    border-radius:0.8rem;
    color:#FF8CF7;
    font-size:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Span =styled.span`
    color:#ffffff;  
    font-size:1.8rem;
    font-weight:700;
    margin-left:1.8rem;
`
const P = styled.p`
    font-weight:300;
    color:#ffffff;
    text-align:center;
`
const RegisterButton = styled.button`
    border:none;
    background-color:transparent;
    color:#FF8CF7;
    &:hover{
        text-decoration:underline;
    }
`

const LoginModal:React.FC<LoginPropsTypes> = ({handleShowModal,handleCloseModal,modal}) => {
    const {signIn} = useAuth()

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    

    const handleSignIn = () =>{
        signIn(login,password)
    }
    
    /* useEffect(() => {
        if(modal){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'unset';
        }
    }, []) */
    
    return (
        <ShadowBackground>
            <Container>
                <ModalHeader>
                    <Title>Connexion</Title>
                    <CloseButton onClick={()=>handleCloseModal(!modal)}><FontAwesomeIcon icon={faTimes} /></CloseButton>
                </ModalHeader>
                <StyledForm onSubmit={(e:React.FormEvent<HTMLFormElement>)=>e.preventDefault()}>
                    <Label>Login</Label>
                    <StyledInput placeholder="email@exemple.com ou xxdarksasuke37xx" value={login} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLogin(e.target.value)}/>
                    <Label>Mot de passe</Label>
                    <StyledInput placeholder="Mot de passe" type={password} value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                    <Button onClick={()=>handleSignIn()} ><FontAwesomeIcon icon={faSignInAlt} /><Span>Se connecter</Span></Button>
                </StyledForm>
                <P>Pas de compte ? <RegisterButton onClick={()=>handleShowModal("signup")}>S'inscrire</RegisterButton></P>
                
            </Container>
        </ShadowBackground>
    )
}


export default LoginModal;