import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";
import * as Cookies from "es-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    enum: "",
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const myData = Cookies.get("data");
        if (myData) {
          const parsedData = JSON.parse(myData);
          setAuth(parsedData);
        }
      } catch (error) {
        console.error("Error setting auth data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
