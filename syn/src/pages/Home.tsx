import {useState,useEffect,useRef} from 'react'

import { MainContainer } from '../styles/globaleStyles';
import Search from '../components/Search';
import HeroHome from '../components/HeroHome';
import BackToTop from '../components/BackToTop';
import GlobalHeader from '../components/GlobalHeader';





const Home = () => {
    
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[scrollPosition]);
    
    return (
        <>  
            <div ref={refScrollUp}></div>
            
            <GlobalHeader/>
            <HeroHome/>
            <MainContainer>
                <Search/>
            </MainContainer>
            <BackToTop showGoTop={showGoTop} scrollUp={handleScrollUp}/>
        </>    
    )
}

export default Home;
