import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const { token, user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!user?.isAdmin) {
      alert('Acesso negado. Apenas administradores.')
      return navigate('/')
    }
  }, [user])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Apagar este produto?')) return
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Erro ao apagar produto.')
      }

      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Administração de Produtos</h1>

      {products.length === 0 ? (
        <p>Sem produtos disponíveis.</p>
      ) : (
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Imagem</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Preço</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.price.toFixed(2)} €</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Apagar
                  </button>
                  <Link
                    to={`/editar-produto/${p._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDashboard
