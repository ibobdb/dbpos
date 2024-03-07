import { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './globalStateContext';
import { jwtDecode } from "jwt-decode";
import authAPI from '../api/authAPI';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const getUser = () => {
    setUser(sessionStorage.getItem('token'));
    if (user != null) {
      const decode = jwtDecode(user);
      const userData = {
        user: decode,
        token: user
      }
      return userData
    } else {
      // navigate('/login')
    }
  }

  const [conn, setConn] = useState(true);

  const checkConnection = async () => {
    await authAPI.checkConnection().then((res) => {
      if (res.status == 200) {
        setConn(true);
      }
    }).catch(() => {
      setConn(false)
    })
  }
  useEffect(() => {
    checkConnection()
    if (conn) {
      navigate('/')
    } else {
      navigate('/error')
    }
  }, [conn])
  const { updatePageLoading } = useGlobalState()
  const login = async (data) => {
    updatePageLoading(true)
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/login`, data);
      sessionStorage.setItem('token', response.data.results.token)
      navigate('/');
    } catch (err) {
      throw (err)
    }
    updatePageLoading(false)
  }

  const logout = async () => {
    updatePageLoading(true);
    setTimeout(() => {
      setUser(null)
      // localStorage.removeItem('user')
      // localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      updatePageLoading(false)
      navigate('/login');
    }, 2000)
  }
  return (
    <AuthContext.Provider value={{ getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};