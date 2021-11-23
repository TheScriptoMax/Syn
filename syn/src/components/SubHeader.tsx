import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'
import { device } from '../styles/mediaqueries';

interface SubHeaderTypes {
    isOpen:boolean
}

const Container = styled.div`
    position:absolute;
    width:100vw;
    @media ${device.tablet}{
        position:relative;
        height: 5rem;
        background-color:#FCFCFC;
        display:flex;
        justify-content:space-between;
        align-items:center;
        box-shadow:inset 0px 2px 4px rgba(0,0,0,0.25);
        border-bottom:2px solid #7A7979;
        height: 5rem;
    }
`

const SubHeader:React.FC<SubHeaderTypes> = ({isOpen}) => {
    return (
        <Container>
            <NavBar isOpen={isOpen}/>
        </Container>
    )
}

export default SubHeader


