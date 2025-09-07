import React, { createContext, useState, useEffect } from 'react';
import api from '../axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user')||'null'));
  const [token, setToken] = useState(()=> localStorage.getItem('token') || null);

  useEffect(()=> {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [token, user]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };

  const logout = ()=> { setToken(null); setUser(null); };

  return <AuthContext.Provider value={{ user, token, login, signup, logout }}>{children}</AuthContext.Provider>;
};
