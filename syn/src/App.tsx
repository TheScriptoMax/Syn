import Main from './Main';
import GlobalStyle from './styles/globaleStyles';
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from './context/ApiProvider';
import { AuthProvider } from './context/AuthProvider';





function App() {
  
  
  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <GlobalStyle/>
            <Main/>
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
