import React,{useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    height:100%;
    width:100%;
`

const EmailCheck = () => {
    let navigate = useNavigate()
    const {token} = useParams<string>()
    console.log(token)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/auth/confirmation/${token}`)
        .then(res=>console.log(res))
    })
    
    setTimeout(()=>{
        navigate("/home");
    },5000)

    return (
        <Container>
            <h1>
                Votre compte à été valider. Vous allez être rediriger. 
            </h1>
        </Container>
    )
}

export default EmailCheck;
