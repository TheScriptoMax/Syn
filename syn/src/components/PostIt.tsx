import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';

interface SearchSourceType{
    catégorie:string[];
    id:number;
    logline:string;
    pitch:string;
    title:string;
}

interface DataType {
    data:SearchSourceType;
}

const PostWrapper = styled.li`
    width:26.5rem;
    aspect-ratio:1/1;
    /* height:23.5rem; */
    background-color:#f8f875;
    border-radius:0.8rem;
    padding:1.4rem 1.4rem;
    box-shadow:0px 2px 5px 0px rgba(0,0,0,0.25);
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    text-overflow:ellipsis;
    @media ${device.tablet}{
        width:21.5rem;
    }
    @media ${device.laptopL}{
        width:23.5rem;
    }
    @media ${device.desktop}{
        width:100%;
    }
`;

const Title = styled.h3`
    font-size:2.4rem;
    font-weight:700;
    margin-bottom:2.4rem;
`
const Logline = styled.p`
    text-overflow:ellipsis;
`
const PostIt:React.FC<DataType> = ({data}) => {
    return (
        <PostWrapper>
            <Title>{data.title}</Title>
            <Logline>{data.logline}</Logline>
        </PostWrapper>
    )
}

export default PostIt
