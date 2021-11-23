
import React,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'

const Container = styled.div`
    position:absolute;
    padding:10rem 0;
    background-color:grey;
`
const StyledForm = styled.form`
    height:20rem;
    width:20rem;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    border: 2px solid blue;

`
const Label = styled.label`
    font-size:1.4rem;
    font-weight:500;
`
const StyledInput = styled.input`
    padding: 4px 20px;
`

const Button = styled.button`
    padding: 0.3rem 2rem;
`

const LoginModal:React.FC = () => {
    const {signIn} = useAuth()

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    

    const handleSignIn = () =>{
        signIn(login,password)
    }
    
    
    return (
        <Container>
            <StyledForm onSubmit={(e:React.FormEvent<HTMLFormElement>)=>e.preventDefault()}>
                <Label>login</Label>
                <StyledInput value={login} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLogin(e.target.value)}/>
                <Label>password</Label>
                <StyledInput type={password} value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                <Button onClick={()=>handleSignIn()} >Submit</Button>
            </StyledForm>
            
        </Container>
    )
}


export default LoginModal;