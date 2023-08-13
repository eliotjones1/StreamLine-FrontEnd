import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext.jsx";

const useAuth = () => {
  return useContext(LoginContext);
}

export default useAuth;