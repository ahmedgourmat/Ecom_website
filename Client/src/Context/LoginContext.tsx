import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


interface UserContextType {
  token: any
}

// Create a context with default values
export const UserInfo = createContext<UserContextType | null>(null);

interface UserContextProps {
  children: ReactNode
}

export function UserContext({ children }: UserContextProps) {
  const [token, setToken] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = localStorage.getItem('token') || null
    console.log(tokenInfo)

    if (tokenInfo) {
      setToken(tokenInfo);
    } else {
      navigate(`/login`);
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return null; 
  }

  return (
    <UserInfo.Provider value={{token}}>
      {children}
    </UserInfo.Provider>
  );
}
