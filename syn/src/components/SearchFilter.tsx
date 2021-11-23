import React,{useState} from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaqueries';

/* interface ActiveId {
    id:number;
    name:string;
} */
/* interface ActiveObject {
    activeObject:ActiveId;
    objects:Array<ActiveId>
} */
interface ActiveStyle {
    active:boolean;
}


const Wrapper = styled.ul`
    position:relative;
    display:flex;
    justify-content:center;
    margin-bottom:5rem;
    

`;

const Filter = styled.li<ActiveStyle>`
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:background-color 0.2s ease-in-out;
    background-color:${({active})=> active && "#7D80B3"};
    margin-right:1.8rem;
    &:last-child{
        margin-right:0;

    }
    
`;

const Button = styled.button<ActiveStyle>`
    /* text-transform:uppercase; */
    background-color:transparent;
    border:none;
    padding:0.8rem 1.2rem;
    border-radius:0.2rem;
    font-size:1.8rem;
    font-weight:500;
    color:${({active})=> active && "#ffffff"};
`;


const SearchFilter:React.FC = () => {
    const[toggleActive,setToggleActive] = useState<Array<boolean> >([true,false,false,false])

    // tableau d'objets avec id, name, isActive pour faire un .map après. 

    const handleFilter = (filter:string) => {
        switch(filter){
            case "short":
                setToggleActive([false,true,false,false])
                break;
            case "long":
                setToggleActive([false,false,true,false])
                break;
            case "tv":
                setToggleActive([false,false,false,true])
                break;
            default:
                setToggleActive([true,false,false,false])
        }   
    }
    return (
        <Wrapper>
            <Filter   active={toggleActive[0]} onClick={()=>handleFilter("all")}>
                <Button  active={toggleActive[0]}>Tout</Button>
            </Filter>
            <Filter   active={toggleActive[1]} onClick={()=>handleFilter("short")}>
                <Button  active={toggleActive[1]}>Court</Button>
            </Filter>
            <Filter   active={toggleActive[2]} onClick={()=>handleFilter("long")}>
                <Button  active={toggleActive[2]}>Long</Button>
            </Filter>
            <Filter   active={toggleActive[3]} onClick={()=>handleFilter("tv")}>
                <Button  active={toggleActive[3]}>Série</Button>
            </Filter>
        </Wrapper>
    )
}

export default SearchFilter