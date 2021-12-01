
import React,{createContext,useContext} from 'react';
import axios,{AxiosInstance} from 'axios';


interface AppContextInterface {
    api:AxiosInstance;
}

const Api = createContext<AppContextInterface|null>(null)

const ApiUri = process.env.REACT_APP_API_URL

const ApiProvider:React.FC = ({children}) => {

    const api:AxiosInstance = axios.create({
        baseURL:ApiUri,
        withCredentials:true,
        
    })

    return (
        <Api.Provider value={{
            api
        }}>
            {children}
        </Api.Provider>
    )
}

const useApi = () => {
    const apiContext = useContext(Api);
    if(apiContext==null){
        throw new Error("useAuth() called outside of a AuthProvider");
        
    }
    return apiContext
}

export {ApiProvider,useApi,ApiUri}
