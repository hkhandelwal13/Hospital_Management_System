import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createContext } from 'react';

export const Context  = createContext({isAuthenticated:false});

const AppWrapper = () =>{
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [user,setUser] = useState({});
return (
  <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
   <App></App>
  </Context.Provider>

);
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
