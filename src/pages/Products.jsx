import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
      }
    }

    fetchProducts()
  }, [])

  const handleAdd = (product) => {
    addToCart(product)
    if (onAddToCart) {
      onAddToCart()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4 shadow bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-bold mt-2 text-blue-600">{product.price.toFixed(2)} €</p>
            <button
              onClick={() => handleAdd(product)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
