import React, { createContext, useEffect, useState, useContext } from 'react';
import api from '../axiosConfig';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children })=>{
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const fetchCart = async ()=>{
    if (!token) { setItems([]); return; }
    const res = await api.get('/cart', { headers: { Authorization: `Bearer ${token}` }});
    setItems(res.data?.items || []);
  };

  useEffect(()=> { fetchCart(); }, [token]);

  const addToCart = async (productId) => {
    if (!token) throw new Error('Login required');
    await api.post('/cart', { productId, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` }});
    await fetchCart();
  };

  const removeFromCart = async (productId) => {
    await api.delete(`/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` }});
    await fetchCart();
  };

  return <CartContext.Provider value={{ items, fetchCart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};
