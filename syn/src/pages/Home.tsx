import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import { MainContainer } from '../styles/globaleStyles';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Search from '../components/Search';
import HeroHome from '../components/HeroHome';
import BackToTop from '../components/BackToTop';





const Home = () => {
    const [toggleBurger,setToggleBurger]= useState<boolean>(false)
    const [scrollPosition, setSrollPosition] = useState<number>(0);
    const [showGoTop, setshowGoTop] = useState<boolean>(false);

    const refScrollUp = useRef<HTMLDivElement>(null);

    const handleScrollUp = () => {
        if(refScrollUp.current !== null){
            refScrollUp.current.scrollIntoView();
        }
    };

    const handleVisibleButton = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    
        if (scrollPosition > 400) {
          return setshowGoTop(true);
        } else if (scrollPosition < 400) {
          return setshowGoTop(false);
        }
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
        return ():void =>{
            window.removeEventListener("scroll", handleVisibleButton)
        }
    },[scrollPosition]);
    
    return (
        <>  
            <div ref={refScrollUp}></div>
            <Header handleBurger={(toggle:boolean)=>setToggleBurger(toggle)} toggleBurger={toggleBurger}/>
            <SubHeader isOpen={toggleBurger}/>
            <HeroHome/>
            <MainContainer>
                <Search/>
            </MainContainer>
            <BackToTop showGoTop={showGoTop} scrollUp={handleScrollUp}/>
        </>    
    )
}

export default Home;
