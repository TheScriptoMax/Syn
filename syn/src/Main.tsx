import React, { ReactNode } from 'react'
import { Routes, Route,Navigate} from "react-router-dom";
import EmailCheck from './pages/EmailCheck';
import Profil from './pages/Profil';
import Home from './pages/Home';
import { useAuth } from './context/AuthProvider';
import NewScripts from './pages/NewScripts';

/* const PrivateRoute = ({ children }:{ children?: ReactNode }) => {
    const {isAuth} = useAuth();
    console.log(isAuth)
    return isAuth?.isAuth ? children as unknown as JSX.Element : <Navigate to="/home" />;
} */

const Main:React.FC = () => {
    const {currentUser} = useAuth();
    console.log(currentUser)
    
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/user/:username" element={currentUser ? (<Profil/>):(<Navigate to="/home" />)}/>
                <Route path="/new" element={currentUser ? (<NewScripts/>):(<Navigate to="/home" />)}/>
            </Routes>


            
            <Routes>
                <Route path="/confirmation/:token" element={<EmailCheck/>} />
            </Routes>

        </>
    )
}

export default Main;
