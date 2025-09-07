import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{maxWidth:420}}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div style={{marginTop:8}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div style={{marginTop:8}}><input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></div>
        <div style={{marginTop:12}}><button className="btn">Signup</button></div>
      </form>
    </div>
  );
}
