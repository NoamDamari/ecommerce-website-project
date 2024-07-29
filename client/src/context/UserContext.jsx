import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user){
      setUser(user)
    }
  }, []);

  const handleUserLogin = (user) => {
    setUser(user);
    sessionStorage.setItem('user' , JSON.stringify(user))
  };

  const handleUserSignOut = () => {
    setUser(null);
    sessionStorage.setItem('user' ,null)
  };

  return (
    <UserContext.Provider
      value={{ user, handleUserLogin, handleUserSignOut}}
    >
      {children}
    </UserContext.Provider>
  );
};
