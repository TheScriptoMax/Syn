import React from 'react';
import styled from 'styled-components';

const ScriptContainer = styled.li`
    max-width:39,6rem;
    aspect-ratio:1/1;
    display:flex;
    flex-direction:column;
    border:2px solid black;
    border-radius:2rem;
    padding: 2.4rem 3.6rem;
`;

const HeadWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:3rem;
`;
const TitleWrapper = styled.div`
    
`;

const Title =styled.h3`
    font-weight:700;
    font-size:3.2rem;
    margin-bottom:2.8rem;
`;

const Format = styled.h4`
    font-weight:300;
    font-size:2rem;
`;

const StatusWrapper = styled.div`
    padding-top:0.8rem;
`;

const Status = styled.div`
    padding: 0.2rem 2.4rem;;
    border:2px solid black;
    border-radius:2rem;
    background-color:#807e7e;
    font-size:1.8rem;
    font-weight:700;
`;
const LogLineWrapper =styled.div`
    height:11rem;
    max-width:32rem;
    margin-bottom:2.8rem;
`
const LogLine =styled.p`

    font-size:2rem;
`;

const TagsWrapper = styled.ul`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:2.8rem;
`;

const Tag = styled.li`
    padding: 0.2rem 1.8rem;;
    border:2px solid black;
    border-radius:2rem;
    background-color:transparent;
    margin-right:0.8rem;
`;

const StatsWrapper = styled.div`
    display:flex;
    justify-content:flex-start;
`;

const Reader = styled.p`
    margin-right:0.8rem;
`;

const Contribute =styled.p`

`;

const Scripts:React.FC = () => {
    return (
        <ScriptContainer>
            <HeadWrapper>
                <TitleWrapper>
                    <Title>Titre</Title>
                    <Format>Court</Format>
                </TitleWrapper>
                <StatusWrapper>
                    <Status>Public</Status>
                </StatusWrapper>
            </HeadWrapper>
            <LogLineWrapper>
                <LogLine>Dans l'espace, personne ne vous entend crier</LogLine>
            </LogLineWrapper>
            <TagsWrapper>
                <Tag>Action</Tag>
                <Tag>Aventure</Tag>
            </TagsWrapper>
            <StatsWrapper>
                <Reader>3 lecteurs</Reader>
                <Contribute>1 contribution </Contribute>
            </StatsWrapper>
        </ScriptContainer>
    )
}

export default Scripts
