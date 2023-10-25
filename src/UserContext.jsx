import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({children}) {

  const [logged, setLogged] = useState(() => {
    const storedUser = localStorage.getItem('logged');
    return storedUser !== null ? JSON.parse(storedUser) : {
      status: false
    };
  });

  useEffect(() => {
    localStorage.setItem('logged', JSON.stringify(logged));
  }, [logged]);

  return (
    <UserContext.Provider value={{logged, setLogged}}>
      {children}
    </UserContext.Provider>
  );
}