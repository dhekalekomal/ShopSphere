import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <header className="header">
            <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Link to="/" style={{fontWeight:700, fontSize:20}}>ShopSphere</Link>
              <nav>
                <Link to="/" style={{marginRight:12}}>Products</Link>
                <Link to="/cart" style={{marginRight:12}}>Cart</Link>
                <Link to="/login">Login</Link>
              </nav>
            </div>
          </header>

          <main className="container">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
