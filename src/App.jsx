import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'
import Cart from './pages/Cart'

import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import FloatingCartButton from './components/FloatingCartButton'
import EditProduct from './pages/EditProduct'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { user } = useAuth()

  return (
    <Router>
      <Navbar />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FloatingCartButton
        onClick={() => setIsCartOpen((prev) => !prev)}
        isOpen={isCartOpen}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/produtos"
          element={<Products onAddToCart={() => setIsCartOpen(true)} />}
        />
        <Route path="/criar-produto" element={<CreateProduct />} />
        <Route path="/editar-produto/:id" element={<EditProduct />} />
        <Route path="/carrinho" element={<Cart />} />
        {user?.isAdmin && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
