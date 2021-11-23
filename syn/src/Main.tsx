import React from 'react'
import { Routes, Route} from "react-router-dom";
import EmailCheck from './pages/EmailCheck';
import Profil from './pages/Profil';
import Home from './pages/Home';


const Main:React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route
                    path="/user"
                    element={
                        <Route path="/:username" element={<Profil/>} />
                    }
                />
            </Routes>


            
            <Routes>
                <Route path="/confirmation/:token" element={<EmailCheck/>} />
            </Routes>

        </>
    )
}

export default Main;
