import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';

const Hero = styled.div`
    /* height:39.8rem; */
    aspect-ratio:2/1;
    background-color:#A6AAFF;
    @media ${device.tablet}{
        aspect-ratio:3/1;
    }
    @media ${device.laptopL}{
        aspect-ratio:4/1;
    }
`

const HeroHome = () => {
    return (
        <Hero>
            salut
        </Hero>
    )
}

export default HeroHome;
