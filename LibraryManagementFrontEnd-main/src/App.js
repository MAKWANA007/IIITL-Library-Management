import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Footwear from './pages/Footwear';
import ShoeDetails from './pages/ShoeDetails';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {

  const [cartItems, setCartItems] = useState([])
    
    const getCartItems = async () => {
        try {
            const res = await axios.get(`/api/requestissue/${localStorage.getItem("userName")}`)
            const { data } = res
            setCartItems(data)
        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userName")) {
            getCartItems()
        } else {
          setCartItems([])
        }
    }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
      <Navbar cartItems={cartItems} setCartItems={val => setCartItems(prev => prev.filter(item => item.id !== val.id))} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/books' element={<Footwear />} />
        <Route path='/book/:bookId' element={<ShoeDetails setCartItems={val => setCartItems(prev => [...prev, val])} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
