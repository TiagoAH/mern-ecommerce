import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { clearCart } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    clearCart()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">MyShop</Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/produtos" className="hover:underline">Produtos</Link>
        {user?.isAdmin && (
          <>
            <Link to="/admin" className="hover:underline">Painel Admin</Link>
            <Link to="/criar-produto" className="hover:underline">Novo Produto</Link>
          </>
        )}
        {user ? (
          <>
            <span className="text-sm">Olá, {user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Registo</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
