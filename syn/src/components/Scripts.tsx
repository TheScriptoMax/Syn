import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPen } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../context/ApiProvider';
type Data = {
    createdAt:string;
    format:string;
    logline:string;
    pitch:string;
    status:string;
    titre:string;
    updatedAt:string;
    __v:number;
    _id:string;
    genre:[string];
    likes:[string?];
    reader:[string?];
}

type ScriptDataType = {
    data:Data
}

const ScriptContainer = styled.li`
    max-width:38rem;
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
    align-items:center;
`;

const Reader = styled.p`
    margin-right:0.8rem;
`;

const Contribute =styled.p`
    margin-right:12rem;
`;

const Icon = styled(FontAwesomeIcon) `
    margin-right:1.8rem;
`
const Scripts:React.FC<ScriptDataType> = ({data}) => {
    const {api} = useApi()

    const handleDelete = (id:string) =>{
        api.delete(`/user/scripts/${id}`)
    }

    return (
        <ScriptContainer>
            <HeadWrapper>
                <TitleWrapper>
                    <Title>{data.titre}</Title>
                    <Format>{data.format}</Format>
                </TitleWrapper>
                <StatusWrapper>
                    <Status>{data.status}</Status>
                </StatusWrapper>
            </HeadWrapper>
            <LogLineWrapper>
                <LogLine>{data.logline}</LogLine>
            </LogLineWrapper>
            <TagsWrapper>
                {data.genre.map((elem:any,index:number)=>{
                    return <Tag key={index}>{elem}</Tag>
                }) }
            </TagsWrapper>
            <StatsWrapper>
                <Reader>{data.reader.length} lecteurs</Reader>
                <Contribute>{data.likes.length} j'aime </Contribute>
                <Icon icon={faTrash} onClick={()=>handleDelete(data._id)} />
                <FontAwesomeIcon icon={faPen} />
            </StatsWrapper>
        </ScriptContainer>
    )
}

export default Scripts
