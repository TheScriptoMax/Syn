import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';


const Wrapper = styled.div`
    /* border: 1px solid red; */
    flex-grow:1;
    display:flex;
    justify-content:center;
    align-items:center;
    @media ${device.tablet}{
        justify-content:flex-start
    }
`

const Logo = () => {
    return (
        <Wrapper>
            LOGO
        </Wrapper>
    )
}

export default Logo
