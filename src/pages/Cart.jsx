import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      {cart.length === 0 ? (
        <p>Carrinho vazio 🛒</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.price.toFixed(2)} € × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:underline"
              >
                Remover
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">
            Total: {total.toFixed(2)} €
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Esvaziar Carrinho
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
