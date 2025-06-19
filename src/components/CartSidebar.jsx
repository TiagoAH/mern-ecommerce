import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { X, Trash2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'

function CartSidebar({ isOpen, onClose }) {
  const {
    cart,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
  } = useCart()

  const location = useLocation()

  // Fecha quando o carrinho fica vazio
  useEffect(() => {
    if (cart.length === 0 && isOpen) {
      onClose()
    }
  }, [cart, isOpen, onClose])

  // Fecha ao navegar para outra página
  useEffect(() => {
    onClose()
  }, [location.pathname])

  const handleClearCart = () => {
    if (window.confirm('Tens a certeza que queres limpar o carrinho?')) {
      clearCart()
      onClose()
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!isOpen) return null

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Sidebar do carrinho */}
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Carrinho</h2>
          <button onClick={onClose}>
            <X className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">O carrinho está vazio.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="border p-2 rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.price.toFixed(2)} € x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementItem(item._id)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(item._id)}
                      className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <p className="text-right font-semibold text-lg">
                Total: {total.toFixed(2)} €
              </p>
              <button
                onClick={handleClearCart}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              >
                Limpar Carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartSidebar
