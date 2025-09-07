import React, { useEffect, useState, useContext } from 'react';
import api from '../axiosConfig';
import { CartContext } from '../context/CartContext';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ q:'', category:'', minPrice:'', maxPrice:''});
  const { addToCart } = useContext(CartContext);

  const load = async () => {
    const params = new URLSearchParams(filters);
    const res = await api.get(`/products?${params.toString()}`);
    setProducts(res.data);
  };

  useEffect(()=> { load(); }, []);

  const applyFilters = async () => { await load(); };

  return (
    <div>
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        <input placeholder="Search" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})}/>
        <input placeholder="Category" value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}/>
        <input placeholder="Min" value={filters.minPrice} onChange={e=>setFilters({...filters,minPrice:e.target.value})}/>
        <input placeholder="Max" value={filters.maxPrice} onChange={e=>setFilters({...filters,maxPrice:e.target.value})}/>
        <button className="btn" onClick={applyFilters}>Apply</button>
      </div>

      <div className="grid3">
        {products.map(p => (
          <div className="card" key={p._id}>
            <img src={p.image || 'https://via.placeholder.com/300'} alt={p.name} style={{width:'100%', height:160, objectFit:'cover', borderRadius:6}}/>
            <h3 style={{marginTop:8}}>{p.name}</h3>
            <p>{p.category} • ₹{p.price}</p>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={()=> addToCart(p._id)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
