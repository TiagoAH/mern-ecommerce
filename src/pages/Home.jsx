import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()
        setProducts(data.slice(0, 6)) // apenas os primeiros 6
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <div className="bg-blue-600 text-white py-20 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à nossa loja online!</h1>
        <p className="text-lg mb-6">Descobre ofertas incríveis, produtos exclusivos e entrega rápida.</p>
        <Link
          to="/produtos"
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          Ver todos os produtos
        </Link>
      </div>

      {/* PRODUTOS EM DESTAQUE */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Destaques</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto disponível ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded shadow p-4 hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm flex-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-blue-600">{product.price.toFixed(2)} €</span>
                  <Link
                    to="/produtos"
                    className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
