import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { device } from '../styles/mediaqueries';

interface SearchBarTypes {
    handleInputSearch: (e:string)=>void;
    InputSearchValue: string;
    handleSearch:()=>void
}

const Form = styled.form`
    position:relative;
    margin:0 auto;
    width: 60.83vw;
    height: 5.5rem;
    top:-2.75rem;
    box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.25);
    border-radius:1.3rem  ;
    overflow:hidden;
    display:flex;
    margin-bottom:2.4rem;
`
const LabelHidden = styled.label`
    clip: rect(1px, 1px, 1px, 1px);
    border:0;
    padding:0;
    height: 1px;
    overflow: hidden;
    width: 1px;
    position: absolute;
    white-space: nowrap;
`

const Button = styled.button`
    border:none;
    background-color:#ffffff;
    padding:0 1.8rem;
    color:#7A7979;
`

const SearchInput = styled.input`
    border:none;
    padding: 0 0.2rem;
    flex-grow:1;
    outline:0;
    @media ${device.tablet}{
        width: 50.83vw;

    }    
`

const SearchBar:React.FC<SearchBarTypes> = ({handleInputSearch,InputSearchValue,handleSearch}) => {
    
    return (
        <Form onSubmit={(e)=>e.preventDefault()}>  
            <LabelHidden>Search Bar</LabelHidden>
            <Button type="submit" onClick={()=>handleSearch()}><FontAwesomeIcon icon={faSearch} /></Button>
            <SearchInput type="text" placeholder="Recherche..." value={InputSearchValue} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleInputSearch(e.target.value)}/>
        </Form>
    )
}

export default SearchBar
