import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';
import PostIt from './PostIt';

interface SearchSourceType{
    catégorie:string[];
    id:number;
    logline:string;
    pitch:string;
    title:string;
}
interface SearchResultType {
    _id:string;
    _index:string;
    _score:number;
    _source:SearchSourceType;
    _type:string;
}

interface ResultType {
    searchResult:Array<SearchResultType>|undefined
}

const ResultWrapper = styled.ul`    
    display:grid;
    grid-template-columns: repeat(1, minmax(23.5rem,1fr));
    gap: 1.8rem;
    justify-items: center;
    align-items: center;
    @media ${device.tablet}{
        grid-template-columns: repeat(3, minmax(21.5rem,1fr));      
    }
    @media ${device.desktop}{
        grid-template-columns: repeat(5, 1fr);      
    }
`

const SearchResult:React.FC<ResultType> = ({searchResult}) => {
    return (
        <ResultWrapper>
            {searchResult&&
                searchResult.map((elem,index)=>{
                    return <PostIt key={elem._id} data={elem._source}/>
                })
            }
        </ResultWrapper>
    )
}

export default SearchResult
