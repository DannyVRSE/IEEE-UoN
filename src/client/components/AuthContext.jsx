import axios from "axios";
import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Add this line to import PropTypes
import { useContext } from 'react';
const token = localStorage.getItem("ieeeuon_token");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Add prop validation for 'children'
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    setLoading(true)
    axios.get("/api/members/auth-status", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setUser(response.data.user)
        setLoading(false)
      })
      .catch((error) => {
        console.log(`${error} Not logged in!`)
        setLoading(false)
      })
  }
  return (
    <>
      <AuthContext.Provider value={{ user, getUser, loading}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = ()=>{
  return useContext(AuthContext)
}