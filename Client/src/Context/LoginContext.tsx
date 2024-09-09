import { useEffect, useState, createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


interface UserContextType {
  token : any ,
  user : any ,
  setUser : any
}

// Create a context with default values
export const UserInfo = createContext<UserContextType | null>(null);

interface UserContextProps {
  children: ReactNode
}

export function UserContext({ children }: UserContextProps) {
  const [token, setToken] = useState<any>(null); 
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = localStorage.getItem('userToken') || null
    const userInfo = JSON.parse(localStorage.getItem('userInfo')|| null) 
    console.log(tokenInfo)

    setToken(tokenInfo)
    setUser(userInfo)

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return null; 
  }

  return (
    <UserInfo.Provider value={{token , user , setUser}}>
      {children}
    </UserInfo.Provider>
  );
}
