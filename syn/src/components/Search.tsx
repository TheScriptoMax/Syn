import React,{useState,useEffect} from 'react';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import SearchFilter from './SearchFilter';
import SearchResult from './SearchResult';
import { useApi } from '../context/ApiProvider';

const Wrapper = styled.div`
    position:relative;
    width:100%;
    height:100vh;
`
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


const Search:React.FC = () => {
    const {api} = useApi()
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResultType[]|undefined>()

    // fetch elastic 

    useEffect(() => {
        handleSearch()
        
    },[searchInput])

    const handleSearch = () => {
        const searchSplit = searchInput.split(' ')
        const searchQuery = searchSplit.join('+')
        api.get(`/api/v1/scripts?script=${searchQuery}`)
        .then(res=>{
            console.log(res.data.script)
            setSearchResult(res.data.script)
        })
    }

    return (
        <Wrapper>
            <SearchBar handleInputSearch={(e:string)=>setSearchInput(e)} InputSearchValue={searchInput} handleSearch={()=>handleSearch()}/>
            <SearchFilter/>
            <SearchResult searchResult={searchResult}/>
            
        </Wrapper>
    )
}

export default Search
