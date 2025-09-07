import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div style={{marginTop:8}}><input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></div>
        <div style={{marginTop:12}}><button className="btn">Login</button></div>
      </form>
      <p style={{marginTop:8}}>No account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
