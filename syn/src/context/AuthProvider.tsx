import React,{useState,createContext, useContext} from 'react';
import { useApi } from '../context/ApiProvider' 

/* interface SignUp {
    username:string;
    email:string;
    password:string;
} */
interface AppContextInterface {
    error:any;
    signUp:(username:string,email:string,password:string)=> void;
    signIn:(login:string,password:string)=>void;
    isAuth:boolean;
} 


const Auth = createContext<AppContextInterface|null>(null) 

const AuthProvider:React.FC = ({children}) => {

    const {api} = useApi()

    const [isAuth,setIsAuth] = useState<boolean>(false)
    const [error, setError] = useState<AppContextInterface|null>(null)

    const signUp = (username:string,email:string,password:string) => {
        return api.post(`/api/v1/auth/signup`,{
                username,
                email,
                password,
            }).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log(err.response.data.error[0].msg)
                setError(err.response.data.error[0].msg)
            })
    }
    const signIn = (login:string,password:string)=>{
        api.post('/api/v1/auth/signin',{
            login,
            password,
        }).then((res=>{
            if(res.data.auth){
                console.log(res.data)
                localStorage.setItem('accessToken',res.data.accessToken)
                localStorage.setItem('refreshToken',res.data.refreshToken)
                setIsAuth(true)
            }
        })).catch(err=>{
            console.log(err.response)
        })
    }

    
    return (
        <Auth.Provider value={{
            error,
            signUp,
            signIn,
            isAuth
            }}>
            {children}
        </Auth.Provider>
    )
}


const useAuth = () => {
    const authContext = useContext(Auth);
    if(authContext==null){
        throw new Error("useAuth() called outside of a AuthProvider");
        
    }
    return authContext
}



export { AuthProvider, useAuth}