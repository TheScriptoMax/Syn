
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenSquare,faTimes } from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';

type LoginPropsTypes = {
    handleCloseModal:(modal:boolean)=>void;
    modal:boolean;
}

type CheckerPropsTypes={
    test:boolean
}

const ShadowBackground = styled.div`
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

    top:5rem;
    left:0;
    padding:2.6rem 2.8rem;
    border-radius:2rem;
    background-color:#7D80B3;
    z-index:30;
    @media ${device.tablet}{
        left:13vw;
        width:72vw;
        padding:2.6rem 4.8rem;
    }
    @media ${device.laptopL}{
        left:23vw;
        width:58vw;
        padding:2.6rem 4.8rem;

    }
`
const StyledForm = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:flex-start;
    margin-bottom:3rem;
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
const Title = styled.h2`
    font-size:3rem;
    font-weight:700;
    color:#ffffff;
    text-align:center;
    @media ${device.tablet}{
        text-align:left;
    }
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
    margin-bottom:1.6rem;
`
const PasswordChecker = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:0.4rem;
`
const Checker = styled.p<CheckerPropsTypes>`
    width:50%;
    margin-bottom:1.6rem;
    color:${({test})=>test ? '#FF8CF7':'rgba(255,255,255,0.5)'};
    font-weight:${({test})=>test?"500":"300"};
`

const TermsChecker = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:1rem;
    
`
const CheckBox =styled.input`
    transform:scale(1.2);
    margin-right:1.4rem;
    cursor: pointer;
`
const CheckBoxLabel = styled.label`
    color:#ffffff;
    font-weight:300;
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

const Error = styled.div`
    width:100%;
    height:2rem;
    text-align:center;
    color:yellow;
    margin-bottom:1rem;

`


const RegisterModal:React.FC<LoginPropsTypes> = ({handleCloseModal,modal}) => {
    const {signUp,error} = useAuth()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword,setCheckPassword] =useState<string>('')
    const [agree,setAgree] =useState<boolean>(false)
    const [FormError,setFormError] =useState<string|undefined>(error)
    const [testNumber,setTestNumber] =useState<boolean>(false)
    const [testCase,setTestCase] =useState<boolean>(false)
    const [testCharSpe,setTestCharSpe] =useState<boolean>(false)
    const [testLength,setTestLength] =useState<boolean>(false)
    const [pending,setPending] =useState<boolean>(false)
    
    const checkStrongPassword = (password:string) => {
        if(password.length >= 6){
            setTestLength(true)
        }else{
            setTestLength(false)
        }
        if( /\d/.test(password)){
            setTestNumber(true)
        }else{
            setTestNumber(false)
        }
        if( /[A-Z]/.test(password)&&/[a-z]/.test(password)){
            setTestCase(true)
        }else{
            setTestCase(false)
        }
        if(/\W|_/.test(password)){
            setTestCharSpe(true)
        }else{
            setTestCharSpe(false)
        }
    }

    useEffect(() => {
        checkStrongPassword(password)
        
    }, [password])

    const handleSignUp = () =>{
        if( testNumber && testCase && testLength && testCharSpe){
            if (agree){
                if(password === checkPassword) {
                    signUp(username,email,password)
                    setPending(true)
                } else {
                    setFormError('Les mots de passe ne correspondent pas .')
                }
            } else {
                setFormError('Vous n\'avez pas validé les conditions d\'utilisation')
            }
        }else{
            console.log('Wallah tu t\'débrouille avec ça')
        }
    }

    return (
        <ShadowBackground>
            <Container>
                { pending ? 
                (<>
                    <ModalHeader>
                        <Title>Inscription</Title>
                        <CloseButton onClick={()=>{
                            handleCloseModal(!modal)
                            setPending(false)
                        }}><FontAwesomeIcon icon={faTimes} /></CloseButton>
                    </ModalHeader>
                    <Title>Un Email de confirmation vous à été envoyer.</Title>
                </>)
                :
                (<>
                    <ModalHeader>
                        <Title>Inscription</Title>
                        <CloseButton onClick={()=>handleCloseModal(!modal)}><FontAwesomeIcon icon={faTimes} /></CloseButton>
                    </ModalHeader>
                    <StyledForm onSubmit={(e:React.FormEvent<HTMLFormElement>)=>e.preventDefault()}>
                        <Label>Pseudo</Label>
                        <StyledInput placeholder="xxDarkSaskue37xx" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)}/>
                        <Label>Email</Label>
                        <StyledInput placeholder="Email@gmail.com" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}/>
                        <Label>Mot de passe</Label>
                        <StyledInput placeholder="Tapez votre mot de passe" type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                        <Label>Confirmation mot de passe</Label>
                        <StyledInput placeholder="Retapez votre mot de passe" type="password" value={checkPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCheckPassword(e.target.value)}/>
                        <PasswordChecker>
                            <Checker test={testLength}>~ Au moins 6 caractères</Checker>
                            <Checker test={testNumber}>~ Contiens des chiffres</Checker>
                            <Checker test={testCharSpe}>~ Contiens des caractères spécieux</Checker>
                            <Checker test={testCase}>~ Contiens des majuscules et des minuscules</Checker>
                        </PasswordChecker>
                        <TermsChecker>
                            <CheckBox type="checkbox" id="agree" onChange={()=>setAgree(!agree)}/>
                            <CheckBoxLabel htmlFor="agree">En créant un compte, vous acceptez les conditions d'utilisation ainsi que la politique de confidentialité </CheckBoxLabel>
                        </TermsChecker>
                        <Error>{FormError}</Error>
                        <Button onClick={()=>handleSignUp()} ><FontAwesomeIcon icon={faPenSquare} /><Span>S'inscrire</Span></Button>
                    </StyledForm>
                </>)
                }
            </Container>
        </ShadowBackground>
    )
}


export default RegisterModal;