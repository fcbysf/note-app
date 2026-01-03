import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

  const [isLogedin, setIsLogedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLogedin");
    const storedUserId = localStorage.getItem("userId");

    if (storedLogin && storedUserId && JSON.parse(storedLogin)) {
      setIsLogedIn(true);
      setUserId(storedUserId);
    }
    setLoading(false);
  }, []);
  const logout = () => {
  setIsLogedIn(false);
  setUserId(null);
  localStorage.removeItem("isLogedin");
  localStorage.removeItem("userId");

};

  return (
    <UserContext.Provider
      value={{ isLogedin, setIsLogedIn, userId, setUserId, loading , logout}}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
