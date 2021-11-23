
import React,{useState} from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'

const Container = styled.div`
    height:100vh;
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

const RegisterModal:React.FC = () => {
    const {signUp,error} = useAuth()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    

    const handleSignUp = () =>{
        signUp(username,email,password)
    }

    return (
        <Container>
            <StyledForm onSubmit={(e:React.FormEvent<HTMLFormElement>)=>e.preventDefault()}>
                <Label>username</Label>
                <StyledInput value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)}/>
                <Label>email</Label>
                <StyledInput value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}/>
                <Label>password</Label>
                <StyledInput type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                <Button onClick={()=>handleSignUp()} >Submit</Button>
                <p>{error}</p>
            </StyledForm>
        </Container>
    )
}


export default RegisterModal;