import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart(){
  const { items, removeFromCart } = useContext(CartContext);
  const total = items.reduce((s, it)=> s + (it.productId.price || 0) * it.quantity, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {items.map(it => (
            <div key={it.productId._id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:10, border:'1px solid #eee', borderRadius:8, marginBottom:8}}>
              <div>
                <div style={{fontWeight:600}}>{it.productId.name}</div>
                <div>₹{it.productId.price} × {it.quantity}</div>
              </div>
              <div>
                <button className="btn" onClick={()=> removeFromCart(it.productId._id)} style={{background:'#ef4444'}}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{marginTop:12,fontWeight:700}}>Total: ₹{total}</div>
        </div>
      )}
    </div>
  );
}
