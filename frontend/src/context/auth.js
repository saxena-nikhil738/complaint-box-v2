import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    enum: "",
    email: "",
    token: "",
    check: true,
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        username: parseData.username,
        enum: parseData.enum,
        email: parseData.email,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
