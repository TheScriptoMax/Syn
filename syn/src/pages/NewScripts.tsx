import React from 'react'
import styled from 'styled-components'
import GlobalHeader from '../components/GlobalHeader'
import { MainContainer } from '../styles/globaleStyles'
import NewScriptForm from '../components/NewScriptForm';

const NewScriptWrapper = styled.div`
     width:50vw;
     padding: 6rem 1rem;
     margin:0 auto;
     display:flex;
     flex-direction:column; 

`


const Title = styled.h1`
    text-align:left;
    font-weight:500;
    font-size:3rem;
    margin-bottom:2rem;
`
const Separator = styled.span`
    width:100%;
    height:0.1rem; 
    background-color:black;
    margin-bottom:2rem;
`

const NewScripts = () => {
    return (
        <>
            <GlobalHeader/>
            <MainContainer>
                <NewScriptWrapper>
                    <Title>Créer un nouveau Script</Title>
                    <Separator/>
                    <NewScriptForm/>
                </NewScriptWrapper>
            </MainContainer>
        </>
    )
}

export default NewScripts
