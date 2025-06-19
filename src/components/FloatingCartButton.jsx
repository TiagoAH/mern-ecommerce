import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

function FloatingCartButton({ onClick, isOpen }) {
  const { cart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition z-50"
    >
      <ShoppingCart />
      {total.toFixed(2)} €
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}

export default FloatingCartButton
