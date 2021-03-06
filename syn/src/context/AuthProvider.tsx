import React,{useState,createContext, useContext,useEffect} from 'react';
import { useApi } from '../context/ApiProvider' 

/* interface SignUp {
    username:string;
    email:string;
    password:string;
} */
interface Payload {
    username:string;
    id:string;
    iat:number;
    exp:number

}
interface Expired {
    expiredAt: string;
    message: string;
    name: string;
}
interface CurrentUserType {
    isAuth:boolean;
    payload:Payload;
    expired:Expired;
}

interface AppContextInterface {
    error:any;
    signUp:(username:string,email:string,password:string)=> void;
    signIn:(login:string,password:string)=>void;
    currentUser:CurrentUserType|undefined;
    logout:()=>void;
} 


const Auth = createContext<AppContextInterface|null>(null) 

const AuthProvider:React.FC = ({children}) => {

    const {api} = useApi()

    const [currentUser,setCurrentUser] = useState<CurrentUserType|undefined>()
    const [error, setError] = useState<AppContextInterface|null>(null)
    const [loading, setLoading] = useState<boolean>(false)

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

    const getUser =()=>{
        return api.get('/api/v1/auth').then(res=>{
            if(res.data){
                console.log(res.data)
                setCurrentUser(res.data)
            }
        })
        
    }

    const signIn =  (login:string,password:string)=>{
        return new Promise<void>((resolve, reject) => {
            setLoading(true)  
            api.post('/api/v1/auth/signin',{
                login,
                password,
            }).then((res=>{
                if(res.data){
                    console.log(res)
                    setLoading(false)
                    return getUser()
                }
            })).catch(err=>{
                console.log(err.response)
            })
        })
    }

    const logout = ()=>{
        return new Promise<void>((resolve,reject)=>{
            api.get('api/v1/auth/logout')
            .then((res)=>{
                console.log(res)
                setCurrentUser(undefined)
                return getUser()
            }).catch(err=>{
                console.log(err.response)
            })
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Auth.Provider value={{
            error,
            signUp,
            signIn,
            currentUser,
            logout
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